import type { DashboardSummary, ImpactProfile } from "@doneisbetter/schemas";

const NORM_VERSION = "1";

function platformFamily(osName: string): DashboardSummary["platform_family"] {
  const s = osName.toLowerCase();
  if (s.includes("mac")) return "macos";
  if (s.includes("win")) return "windows";
  if (s.includes("linux")) return "linux";
  return "unknown";
}

function chipFamily(chipValue: string): string {
  const s = chipValue.toLowerCase();
  if (/\bm[1-4]\b/.test(s) || s.includes("apple") || s.includes("m1") || s.includes("m2") || s.includes("m3") || s.includes("m4")) {
    return "apple_m_series";
  }
  if (s.includes("intel")) return "intel";
  if (s.includes("arm")) return "arm_other";
  if (!s.trim()) return "unknown";
  return "other";
}

/** Align with ingest aggregate memory bands (string keys). */
export function memoryBandGbLabel(gb: number): string {
  if (gb < 8) return "under_8gb";
  if (gb < 16) return "8_16gb";
  if (gb < 32) return "16_32gb";
  if (gb < 64) return "32_64gb";
  return "64gb_plus";
}

function uniqueSorted(ids: string[]): string[] {
  return [...new Set(ids.map((x) => x.trim()).filter(Boolean))].sort();
}

/** Heuristic model family from id (e.g. llama3.1 -> llama). */
export function modelFamilyFromId(id: string): string {
  const base = id.split(/[/:]/)[0]?.split(/[-_.]/)[0]?.toLowerCase() ?? "unknown";
  if (!base || base.length > 64) return "unknown";
  return base;
}

/**
 * Build dashboard summary for optional submission alongside raw profile.
 */
export function buildDashboardSummary(profile: ImpactProfile): DashboardSummary {
  const h = profile.host;
  const memGb = Number(h.memory_gb.value);

  const reachable_runtime_count = profile.runtimes.filter((r) => r.status === "installed_reachable").length;
  const partial_runtime_count = profile.runtimes.filter((r) => r.status === "partial").length;

  const runtime_families = uniqueSorted(profile.runtimes.map((r) => r.id));
  const tool_families = uniqueSorted(profile.tools.map((t) => t.id));

  const modelFamiliesSet = new Set<string>();
  for (const m of profile.models) {
    modelFamiliesSet.add(modelFamilyFromId(m.id));
  }
  const model_families = [...modelFamiliesSet].sort();

  const local_model_count = profile.models.filter((m) => m.locality === "local").length;
  const cloud_tool_present = profile.models.some((m) => m.locality === "cloud");

  return {
    summary_version: "impact.summary.v0.1",
    normalization_version: NORM_VERSION,
    profile_schema_version: "impact.v0.3",
    platform_family: platformFamily(String(h.os_name.value)),
    machine_class: String(h.machine_class.value),
    chip_family: chipFamily(String(h.chip.value)),
    memory_band_gb: memoryBandGbLabel(Number.isFinite(memGb) ? memGb : 0),
    runtime_families,
    tool_families,
    model_families,
    local_model_count,
    cloud_tool_present,
    reachable_runtime_count,
    partial_runtime_count,
    architecture: String(h.architecture.value),
  };
}
