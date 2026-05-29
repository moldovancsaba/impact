import type { ImpactProfile } from "@doneisbetter/schemas";

/** Deterministic, scan-grounded suggestions — no scores, no cloud calls. */
export type Recommendation = {
  rule_id: string;
  title: string;
  body: string;
  /** Short facts from the profile that justify this item (for transparency). */
  evidence: string[];
};

function diskFreeGb(profile: ImpactProfile): number | null {
  const v = profile.host.disk?.free_gb?.value;
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

/**
 * Build ordered recommendations from profile state only.
 * Stable sort by `rule_id` for reproducible HTML and tests.
 */
export function buildRecommendations(profile: ImpactProfile): Recommendation[] {
  const out: Recommendation[] = [];

  for (const r of profile.runtimes) {
    if (r.status === "installed_unreachable") {
      out.push({
        rule_id: `action.runtime_api_unreachable:${r.id}`,
        title: `Bring “${r.id}” online for discovery`,
        body:
          "A binary or install was detected, but the local service API did not respond. Start the runtime (or fix localhost access), then re-run the scan so models can be enumerated when supported.",
        evidence: [`Runtime ${r.id}: status=${r.status}`],
      });
    }
  }

  const reachable = profile.runtimes.filter((r) => r.status === "installed_reachable");
  if (reachable.length > 0 && profile.models.length === 0) {
    out.push({
      rule_id: "action.no_models_enumerated",
      title: "No models listed yet",
      body:
        "At least one runtime reported reachable, but no models appeared in this scan. Pull or install models in that runtime, or confirm its API lists models — then scan again.",
      evidence: reachable.map((r) => `Runtime ${r.id}: status=${r.status}`),
    });
  }

  if (
    profile.models.length === 0 &&
    reachable.length === 0 &&
    profile.runtimes.length > 0 &&
    !profile.runtimes.some((r) => r.status === "installed_unreachable")
  ) {
    out.push({
      rule_id: "note.no_models_and_no_reachable_runtime",
      title: "Limited model visibility this run",
      body:
        "No reachable runtime with model inventory was observed. Install or start a supported local runtime (see runtimes table), or expect an empty models section until one is online.",
      evidence: profile.runtimes.map((r) => `Runtime ${r.id}: status=${r.status}`),
    });
  }

  const mlx = profile.runtimes.find((r) => r.id === "mlx_python");
  if (mlx?.installed && mlx.capabilities && mlx.capabilities.model_inventory !== "full") {
    out.push({
      rule_id: "note.mlx_inventory_scope",
      title: "MLX inventory scope",
      body:
        mlx.capabilities.notes ??
        "MLX support in this build does not imply full local model enumeration; treat the models table as authoritative for what was discovered.",
      evidence: [
        `Runtime mlx_python: model_inventory=${mlx.capabilities.model_inventory}`,
        `Runtime mlx_python: status=${mlx.status}`,
      ],
    });
  }

  const free = diskFreeGb(profile);
  if (free != null && free < 5) {
    out.push({
      rule_id: "note.low_free_disk",
      title: "Low free disk (coarse probe)",
      body:
        "Reported free space is under ~5 GB. Large local models need substantial disk; free space is a coarse df-style hint, not a guarantee of install success.",
      evidence: [`host.disk.free_gb ≈ ${String(free)} GB`],
    });
  }

  const toolsInstalled = profile.tools.filter((t) => t.installed);
  if (toolsInstalled.length === 0) {
    out.push({
      rule_id: "note.no_allowlisted_tools",
      title: "No allowlisted tools on PATH",
      body:
        "IMPACT only checks a curated tool allowlist. Absence here does not mean your machine has no editors or CLIs — only that none of the tracked tools were found on PATH for this scan.",
      evidence: ["tools: no installed rows in allowlist"],
    });
  }

  out.sort((a, b) => a.rule_id.localeCompare(b.rule_id));
  return out;
}
