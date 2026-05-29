import type { ImpactProfile } from "@doneisbetter/schemas";

/**
 * Conservative, scan-derived notes for support — no speculation beyond profile state.
 */
export function buildDiagnostics(profile: ImpactProfile): string[] {
  const lines: string[] = [];
  const submitUrl =
    typeof process !== "undefined" && process.env?.IMPACT_SUBMIT_URL?.trim();

  if (!submitUrl) {
    lines.push(
      "Submission is not configured: IMPACT_SUBMIT_URL is unset. Local scan outputs are still written; nothing is uploaded unless you opt in after configuring an endpoint."
    );
  }

  for (const r of profile.runtimes) {
    if (r.status === "installed_unreachable") {
      lines.push(
        `Runtime “${r.id}”: binary or install was detected, but the local service API did not respond — model inventory may be missing or stale.`
      );
    }
    if (r.status === "partial") {
      lines.push(
        `Runtime “${r.id}”: partial support only (${r.capabilities?.model_inventory ?? "unknown"} model inventory). ${r.capabilities?.notes ?? ""}`.trim()
      );
    }
    if (r.status === "unknown") {
      lines.push(`Runtime “${r.id}”: operational state could not be classified reliably on this platform.`);
    }
  }

  const installed = profile.runtimes.filter((r) => r.installed);
  if (installed.length > 0 && profile.models.length === 0) {
    lines.push(
      "No models were listed: supported runtimes may be unreachable, report no models, or model enumeration is not implemented for this runtime."
    );
  }

  const lowChip = profile.host.chip.confidence === "low" || profile.host.chip.confidence === "unknown";
  if (lowChip && profile.host.chip.value == null) {
    lines.push("Host chip: no reliable CPU model string — machine class may be coarse.");
  }

  return lines;
}
