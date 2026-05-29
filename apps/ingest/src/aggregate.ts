import type { DashboardSummary, ImpactProfile } from "@doneisbetter/schemas";

/** Coarse memory bands for aggregate display */
export function memoryBandGb(gb: number): string {
  if (gb < 8) return "under_8gb";
  if (gb < 16) return "8_16gb";
  if (gb < 32) return "16_32gb";
  if (gb < 64) return "32_64gb";
  return "64gb_plus";
}

function bump(m: Map<string, number>, key: string): void {
  m.set(key, (m.get(key) ?? 0) + 1);
}

export type RawAggregateRollup = {
  submission_count: number;
  machine_class: Map<string, number>;
  chip: Map<string, number>;
  memory_band: Map<string, number>;
  os_name: Map<string, number>;
  architecture: Map<string, number>;
  /** runtime id -> count (one increment per profile that lists this runtime) */
  runtime_id: Map<string, number>;
  /** runtime id + status */
  runtime_id_status: Map<string, number>;
  tool_id: Map<string, number>;
  /** model id + locality */
  model_id_locality: Map<string, number>;
};

export function emptyRollup(): RawAggregateRollup {
  return {
    submission_count: 0,
    machine_class: new Map(),
    chip: new Map(),
    memory_band: new Map(),
    os_name: new Map(),
    architecture: new Map(),
    runtime_id: new Map(),
    runtime_id_status: new Map(),
    tool_id: new Map(),
    model_id_locality: new Map(),
  };
}

export function accumulateProfile(r: RawAggregateRollup, p: ImpactProfile): void {
  r.submission_count += 1;
  const h = p.host;
  bump(r.machine_class, String(h.machine_class.value));
  bump(r.chip, String(h.chip.value));
  bump(r.memory_band, memoryBandGb(Number(h.memory_gb.value)));
  bump(r.os_name, String(h.os_name.value));
  bump(r.architecture, String(h.architecture.value));

  for (const rt of p.runtimes) {
    bump(r.runtime_id, rt.id);
    bump(r.runtime_id_status, `${rt.id}::${rt.status}`);
  }
  for (const t of p.tools) {
    bump(r.tool_id, t.id);
  }
  for (const m of p.models) {
    bump(r.model_id_locality, `${m.id}::${m.locality}`);
  }
}

/** Fast-path rollup from client-prepared summary (MLP). */
export function accumulateDashboardSummary(r: RawAggregateRollup, s: DashboardSummary): void {
  r.submission_count += 1;
  bump(r.machine_class, s.machine_class);
  bump(r.chip, s.chip_family);
  bump(r.memory_band, s.memory_band_gb);
  bump(r.os_name, s.platform_family);
  if (s.architecture) bump(r.architecture, s.architecture);
  for (const id of s.runtime_families) bump(r.runtime_id, id);
  const reachB =
    s.reachable_runtime_count === 0 ? "0" : s.reachable_runtime_count === 1 ? "1" : "2plus";
  bump(r.runtime_id_status, `summary_reachable::${reachB}`);
  const partB = s.partial_runtime_count === 0 ? "0" : s.partial_runtime_count === 1 ? "1" : "2plus";
  bump(r.runtime_id_status, `summary_partial::${partB}`);
  for (const id of s.tool_families) bump(r.tool_id, id);
  for (const mf of s.model_families) bump(r.model_id_locality, `${mf}::summary`);
}

export type Bucket = { key: string; count: number };

/** Keep only buckets with count >= minCount; sort by count desc; cap at maxBuckets */
export function applyPrivacyThreshold(
  map: Map<string, number>,
  minCount: number,
  maxBuckets: number
): Bucket[] {
  const rows = [...map.entries()]
    .filter(([, c]) => c >= minCount)
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, maxBuckets);
  return rows;
}

export type PublicStatsPayload = {
  schema_version: "impact.stats.v0.1";
  generated_at: string;
  privacy: { min_bucket_count: number; suppressed_small_buckets: true };
  submission_count: number;
  /** True when total submissions are below min — no per-dimension aggregates published */
  below_global_threshold: boolean;
  hardware: {
    machine_class: Bucket[];
    chip: Bucket[];
    memory_band: Bucket[];
    os_name: Bucket[];
    architecture: Bucket[];
  };
  tools: {
    runtime_id: Bucket[];
    runtime_by_status: Bucket[];
    tool_id: Bucket[];
  };
  models: {
    by_id_locality: Bucket[];
  };
};

export function buildPublicStatsFromRollup(
  r: RawAggregateRollup,
  minBucketCount: number,
  maxBuckets = 50
): PublicStatsPayload {
  const belowGlobal = r.submission_count < minBucketCount;

  if (belowGlobal) {
    return {
      schema_version: "impact.stats.v0.1",
      generated_at: new Date().toISOString(),
      privacy: { min_bucket_count: minBucketCount, suppressed_small_buckets: true },
      submission_count: r.submission_count,
      below_global_threshold: true,
      hardware: {
        machine_class: [],
        chip: [],
        memory_band: [],
        os_name: [],
        architecture: [],
      },
      tools: { runtime_id: [], runtime_by_status: [], tool_id: [] },
      models: { by_id_locality: [] },
    };
  }

  return {
    schema_version: "impact.stats.v0.1",
    generated_at: new Date().toISOString(),
    privacy: { min_bucket_count: minBucketCount, suppressed_small_buckets: true },
    submission_count: r.submission_count,
    below_global_threshold: false,
    hardware: {
      machine_class: applyPrivacyThreshold(r.machine_class, minBucketCount, maxBuckets),
      chip: applyPrivacyThreshold(r.chip, minBucketCount, maxBuckets),
      memory_band: applyPrivacyThreshold(r.memory_band, minBucketCount, maxBuckets),
      os_name: applyPrivacyThreshold(r.os_name, minBucketCount, maxBuckets),
      architecture: applyPrivacyThreshold(r.architecture, minBucketCount, maxBuckets),
    },
    tools: {
      runtime_id: applyPrivacyThreshold(r.runtime_id, minBucketCount, maxBuckets),
      runtime_by_status: applyPrivacyThreshold(r.runtime_id_status, minBucketCount, maxBuckets),
      tool_id: applyPrivacyThreshold(r.tool_id, minBucketCount, maxBuckets),
    },
    models: {
      by_id_locality: applyPrivacyThreshold(r.model_id_locality, minBucketCount, maxBuckets),
    },
  };
}

export function buildPublicStats(
  profiles: ImpactProfile[],
  minBucketCount: number,
  maxBuckets = 50
): PublicStatsPayload {
  const r = emptyRollup();
  for (const p of profiles) {
    accumulateProfile(r, p);
  }
  return buildPublicStatsFromRollup(r, minBucketCount, maxBuckets);
}
