#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { Command } from "commander";
import { buildDashboardSummary, runScan } from "@doneisbetter/core";
import {
  buildDiagnostics,
  writeDashboardSummaryJson,
  writeHtmlReport,
  writeJsonReport,
} from "@doneisbetter/reporting";
import {
  appendLocalReceipt,
  submitProfile,
  writePayloadPreview,
  writeSubmissionReceiptJson,
} from "@doneisbetter/submission";

const PREAMBLE = `
I.M.P.A.C.T. scans this computer for AI-relevant environment signals: OS, hardware
coarse class, optional GPU hints, detected runtimes (e.g. Ollama), curated tools
on PATH, and models exposed by supported runtimes.

We do not collect serial numbers, hardware UUIDs, usernames, hostnames, file
contents, or environment secrets. A salted coarse fingerprint may be included
for anonymous aggregation if you opt in to submission.
`.trim();

async function promptYesNo(rl: readline.Interface, question: string): Promise<boolean> {
  const a = (await rl.question(`${question} [y/N] `)).trim().toLowerCase();
  return a === "y" || a === "yes";
}

async function promptExact(rl: readline.Interface, question: string, token: string): Promise<boolean> {
  const a = (await rl.question(question)).trim();
  return a === token;
}

const cliPackage = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
) as { version: string };

const program = new Command();
program
  .name("impact")
  .description("I.M.P.A.C.T. — privacy-first local AI scanner")
  .version(cliPackage.version);

program
  .command("scan")
  .description("Run local scan, write impact-profile.json and impact-report.html")
  .option("-o, --output-dir <dir>", "directory for reports", process.cwd())
  .option("--no-readiness", "omit coarse readiness section")
  .option("--no-submit", "do not prompt for anonymous submission")
  .option(
    "--yes-submit",
    "with first prompt accepted, skip typing SUBMIT (dangerous; automation only)"
  )
  .action(
    async (opts: {
      outputDir: string;
      readiness: boolean;
      submit: boolean;
      yesSubmit: boolean;
    }) => {
      const outDir = path.resolve(opts.outputDir);
      console.log(PREAMBLE);
      console.log("\nScanning…\n");

      const profile = await runScan({ includeReadiness: opts.readiness });

      const jsonPath = await writeJsonReport(outDir, profile);
      const htmlPath = await writeHtmlReport(outDir, profile);

      console.log(`Wrote ${jsonPath}`);
      console.log(`Wrote ${htmlPath}`);

      const dashboardSummary = buildDashboardSummary(profile);
      const summaryPath = await writeDashboardSummaryJson(outDir, dashboardSummary);
      console.log(`Wrote ${summaryPath}`);

      const diag = buildDiagnostics(profile);
      if (diag.length > 0) {
        console.log("\nDiagnostics:");
        for (const line of diag) console.log(`  · ${line}`);
      }

      if (!opts.submit) {
        console.log("\nSkipping submission (--no-submit).");
        return;
      }

      const endpoint = process.env.IMPACT_SUBMIT_URL?.trim() ?? "";
      const allowNonInteractiveSubmit =
        !input.isTTY &&
        opts.yesSubmit &&
        Boolean(endpoint) &&
        process.env.IMPACT_SUBMIT_NON_INTERACTIVE === "1";

      if (!input.isTTY && !allowNonInteractiveSubmit) {
        console.log(
          "\nNot a TTY: submission prompt skipped. For automation: set IMPACT_SUBMIT_URL, export IMPACT_SUBMIT_NON_INTERACTIVE=1, and use --yes-submit (see apps/cli/README.md)."
        );
        return;
      }

      const rl = input.isTTY ? readline.createInterface({ input, output }) : undefined;
      try {
        if (rl) {
          const wants = await promptYesNo(rl, "\nSubmit anonymous profile to configured endpoint?");
          if (!wants) {
            console.log("Not submitting. Your local files are unchanged.");
            return;
          }
        } else {
          console.log(
            "\nNon-interactive submission (IMPACT_SUBMIT_NON_INTERACTIVE=1 + --yes-submit + IMPACT_SUBMIT_URL)."
          );
        }

        const previewPath = await writePayloadPreview(outDir, profile, dashboardSummary);
        console.log(`\nExact payload preview written to:\n  ${previewPath}`);
        console.log(
          "\nPayload is the submission envelope: canonical profile plus impact.summary.v0.1 dashboard_summary (see docs/submission-contract.md)."
        );

        if (rl && !opts.yesSubmit) {
          const ok = await promptExact(
            rl,
            'Type SUBMIT to confirm sending this payload (or press Enter to cancel): ',
            "SUBMIT"
          );
          if (!ok) {
            console.log("Cancelled. Nothing was sent.");
            return;
          }
        }

        const result = await submitProfile(profile, { dashboardSummary });
        const receiptPath = await writeSubmissionReceiptJson(outDir, {
          schema_version: "impact.submission_receipt.v1",
          created_at: new Date().toISOString(),
          endpoint,
          payload_sha256: result.payload_sha256,
          preview_payload_sha256: result.payload_sha256,
          outcome: result.ok
            ? result.duplicate
              ? "duplicate"
              : "success"
            : "failure",
          submission_id: result.ok ? result.submission_id : undefined,
          attempts: result.attempts,
          error: result.ok ? undefined : result.error,
          last_status: result.ok ? undefined : result.last_status,
          duplicate: result.ok ? result.duplicate === true : undefined,
          run_id: profile.run_id,
        });
        console.log(`\nSubmission receipt written to:\n  ${receiptPath}`);

        if (result.ok) {
          if (result.duplicate) {
            console.log(
              `\nServer reported duplicate (HTTP 409). Prior ingest reference: ${result.submission_id}\n` +
                "Local profile and preview files are unchanged. See docs/submission-contract.md — Duplicate handling."
            );
            await appendLocalReceipt(
              homedir(),
              `duplicate_409 submission_id=${result.submission_id} run_id=${profile.run_id}`
            );
          } else {
            console.log(`\nSubmitted. receipt id: ${result.submission_id}`);
            await appendLocalReceipt(
              homedir(),
              `ok submission_id=${result.submission_id} run_id=${profile.run_id}`
            );
          }
        } else {
          console.error(`\nSubmission failed: ${result.error}`);
          await appendLocalReceipt(homedir(), `fail run_id=${profile.run_id} ${result.error}`);
        }
      } finally {
        rl?.close();
      }
    }
  );

program.parseAsync(process.argv);
