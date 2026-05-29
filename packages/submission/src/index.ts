import { appendFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { DashboardSummary, ImpactProfile } from "@doneisbetter/schemas";
import {
  buildSubmissionWireBody,
  sha256Payload,
  submitProfile,
  type SubmissionResult,
  type SubmitProfileOptions,
} from "./submit-profile.js";

export type { SubmissionResult, SubmitProfileOptions };
export { buildSubmissionWireBody, sha256Payload, submitProfile };

const RECEIPT_DIR = ".impact";
const RECEIPT_FILE = "submission-receipts.log";

export async function appendLocalReceipt(
  homedir: string,
  line: string
): Promise<void> {
  const dir = path.join(homedir, RECEIPT_DIR);
  await mkdir(dir, { recursive: true });
  const file = path.join(dir, RECEIPT_FILE);
  await appendFile(file, `${new Date().toISOString()} ${line}\n`, "utf8");
}

export async function writePayloadPreview(
  dir: string,
  profile: ImpactProfile,
  dashboardSummary?: DashboardSummary
): Promise<string> {
  await mkdir(dir, { recursive: true });
  const file = path.join(dir, "impact-submission-preview.json");
  const pretty =
    dashboardSummary !== undefined
      ? JSON.stringify(JSON.parse(buildSubmissionWireBody(profile, dashboardSummary)), null, 2)
      : JSON.stringify(profile, null, 2);
  await writeFile(file, `${pretty}\n`, "utf8");
  return file;
}

export type SubmissionReceiptFile = {
  schema_version: "impact.submission_receipt.v1";
  created_at: string;
  endpoint: string;
  /** SHA-256 of the exact JSON body POSTed (matches `impact-submission-preview.json` when unchanged). */
  payload_sha256: string;
  preview_payload_sha256: string;
  outcome: "success" | "failure" | "duplicate";
  submission_id?: string;
  attempts: number;
  error?: string;
  last_status?: number;
  /** True when server returned HTTP 409 (duplicate / idempotent conflict). */
  duplicate?: boolean;
  run_id: string;
};

export async function writeSubmissionReceiptJson(
  dir: string,
  receipt: SubmissionReceiptFile
): Promise<string> {
  await mkdir(dir, { recursive: true });
  const file = path.join(dir, "impact-submission-receipt.json");
  await writeFile(file, `${JSON.stringify(receipt, null, 2)}\n`, "utf8");
  return file;
}
