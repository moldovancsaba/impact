import {
  validateDashboardSummary,
  validateImpactProfile,
  type DashboardSummary,
  type ImpactProfile,
} from "@doneisbetter/schemas";
import {
  accumulateDashboardSummary,
  accumulateProfile,
  buildPublicStatsFromRollup,
  emptyRollup,
  type PublicStatsPayload,
} from "../apps/ingest/src/aggregate";

export type SubmissionStatsRow = {
  profile_json: unknown;
  dashboard_summary_json: unknown | null;
};

export type StatsSegment = "overview" | "full" | "hardware" | "tools" | "models";

function coerceDashboardSummary(input: unknown): DashboardSummary | null {
  try {
    return validateDashboardSummary(input);
  } catch {
    return null;
  }
}

function coerceProfile(input: unknown): ImpactProfile | null {
  try {
    return validateImpactProfile(input);
  } catch {
    return null;
  }
}

export function buildFullStatsFromRows(rows: SubmissionStatsRow[], minBucketCount: number): PublicStatsPayload {
  const rollup = emptyRollup();
  for (const row of rows) {
    if (row.dashboard_summary_json) {
      const summary = coerceDashboardSummary(row.dashboard_summary_json);
      if (summary) {
        accumulateDashboardSummary(rollup, summary);
        continue;
      }
    }
    const profile = coerceProfile(row.profile_json);
    if (profile) {
      accumulateProfile(rollup, profile);
    }
  }
  return buildPublicStatsFromRollup(rollup, minBucketCount);
}

export function toOverview(stats: PublicStatsPayload): object {
  return {
    schema_version: "impact.stats.overview.v0.1",
    generated_at: stats.generated_at,
    submission_count: stats.submission_count,
    below_global_threshold: stats.below_global_threshold,
    min_bucket_count: stats.privacy.min_bucket_count,
  };
}

export function toHardware(stats: PublicStatsPayload): object {
  return {
    schema_version: "impact.stats.hardware.v0.1",
    generated_at: stats.generated_at,
    submission_count: stats.submission_count,
    below_global_threshold: stats.below_global_threshold,
    min_bucket_count: stats.privacy.min_bucket_count,
    ...stats.hardware,
  };
}

export function toTools(stats: PublicStatsPayload): object {
  return {
    schema_version: "impact.stats.tools.v0.1",
    generated_at: stats.generated_at,
    submission_count: stats.submission_count,
    below_global_threshold: stats.below_global_threshold,
    min_bucket_count: stats.privacy.min_bucket_count,
    ...stats.tools,
  };
}

export function toModels(stats: PublicStatsPayload): object {
  return {
    schema_version: "impact.stats.models.v0.1",
    generated_at: stats.generated_at,
    submission_count: stats.submission_count,
    below_global_threshold: stats.below_global_threshold,
    min_bucket_count: stats.privacy.min_bucket_count,
    ...stats.models,
  };
}
