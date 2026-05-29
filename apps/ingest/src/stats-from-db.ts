import type Database from "better-sqlite3";
import { validateDashboardSummary, validateImpactProfile } from "@doneisbetter/schemas";
import {
  accumulateDashboardSummary,
  accumulateProfile,
  buildPublicStatsFromRollup,
  emptyRollup,
  type PublicStatsPayload,
} from "./aggregate.js";

export type SubmissionRow = {
  profile_json: string;
  dashboard_summary_json: string | null;
};

export function loadSubmissionRows(db: Database.Database): SubmissionRow[] {
  return db
    .prepare(`SELECT profile_json, dashboard_summary_json FROM submissions ORDER BY received_at ASC`)
    .all() as SubmissionRow[];
}

function accumulateRowIntoRollup(r: ReturnType<typeof emptyRollup>, row: SubmissionRow): void {
  if (row.dashboard_summary_json) {
    try {
      const s = validateDashboardSummary(JSON.parse(row.dashboard_summary_json) as unknown);
      accumulateDashboardSummary(r, s);
      return;
    } catch {
      /* fall through to profile */
    }
  }
  try {
    const p = validateImpactProfile(JSON.parse(row.profile_json) as unknown);
    accumulateProfile(r, p);
  } catch {
    /* skip corrupt rows */
  }
}

export function buildRollupFromDb(db: Database.Database) {
  const r = emptyRollup();
  for (const row of loadSubmissionRows(db)) {
    accumulateRowIntoRollup(r, row);
  }
  return r;
}

export type OverviewPayload = {
  schema_version: "impact.stats.overview.v0.1";
  generated_at: string;
  submission_count: number;
  below_global_threshold: boolean;
  min_bucket_count: number;
};

export function getOverview(db: Database.Database, minBucketCount: number): OverviewPayload {
  const stats = buildPublicStatsFromRollup(buildRollupFromDb(db), minBucketCount);
  return {
    schema_version: "impact.stats.overview.v0.1",
    generated_at: stats.generated_at,
    submission_count: stats.submission_count,
    below_global_threshold: stats.below_global_threshold,
    min_bucket_count: minBucketCount,
  };
}

export function getFullStats(db: Database.Database, minBucketCount: number): PublicStatsPayload {
  return buildPublicStatsFromRollup(buildRollupFromDb(db), minBucketCount);
}

export function getHardwareSlice(stats: PublicStatsPayload): object {
  return {
    schema_version: "impact.stats.hardware.v0.1",
    generated_at: stats.generated_at,
    submission_count: stats.submission_count,
    below_global_threshold: stats.below_global_threshold,
    min_bucket_count: stats.privacy.min_bucket_count,
    ...stats.hardware,
  };
}

export function getToolsSlice(stats: PublicStatsPayload): object {
  return {
    schema_version: "impact.stats.tools.v0.1",
    generated_at: stats.generated_at,
    submission_count: stats.submission_count,
    below_global_threshold: stats.below_global_threshold,
    min_bucket_count: stats.privacy.min_bucket_count,
    ...stats.tools,
  };
}

export function getModelsSlice(stats: PublicStatsPayload): object {
  return {
    schema_version: "impact.stats.models.v0.1",
    generated_at: stats.generated_at,
    submission_count: stats.submission_count,
    below_global_threshold: stats.below_global_threshold,
    min_bucket_count: stats.privacy.min_bucket_count,
    ...stats.models,
  };
}
