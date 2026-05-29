import { createHash } from "node:crypto";
import type { DashboardSummary, ImpactProfile } from "@doneisbetter/schemas";
import { ImpactSubmissionEnvelopeV01Schema } from "@doneisbetter/schemas";

export type SubmitProfileOptions = {
  /** Per-attempt timeout (ms). Default 15000. */
  timeoutMs?: number;
  /** Max HTTP attempts including first try. Default 3. */
  maxAttempts?: number;
  signal?: AbortSignal;
  /**
   * When set, POST `impact.submission.v0.1` envelope (profile + dashboard_summary).
   * When omitted, POST legacy single ImpactProfile JSON.
   */
  dashboardSummary?: DashboardSummary;
};

export type SubmissionResult =
  | {
      ok: true;
      submission_id: string;
      payload_sha256: string;
      attempts: number;
      raw?: string;
      /** HTTP 409 — server treated this as a duplicate; id usually refers to the prior ingest. */
      duplicate?: boolean;
    }
  | {
      ok: false;
      error: string;
      payload_sha256: string;
      attempts: number;
      last_status?: number;
    };

const DEFAULT_TIMEOUT_MS = 15_000;
const DEFAULT_ATTEMPTS = 3;
const BACKOFF_MS = [500, 2000, 8000] as const;

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function shouldRetryHttp(status: number): boolean {
  if (status === 408 || status === 429) return true;
  if (status >= 500) return true;
  return false;
}

export function sha256Payload(profile: ImpactProfile): string {
  const body = JSON.stringify(profile);
  return createHash("sha256").update(body, "utf8").digest("hex");
}

function sha256Utf8(body: string): string {
  return createHash("sha256").update(body, "utf8").digest("hex");
}

/** Build validated JSON body for MLP submission (profile + summary). */
export function buildSubmissionWireBody(profile: ImpactProfile, summary: DashboardSummary): string {
  const envelope = {
    submission_kind: "impact.submission.v0.1" as const,
    profile,
    dashboard_summary: summary,
  };
  ImpactSubmissionEnvelopeV01Schema.parse(envelope);
  return JSON.stringify(envelope);
}

/**
 * POST profile (and optional dashboard summary) with bounded retries (see docs/submission-contract.md).
 */
export async function submitProfile(
  profile: ImpactProfile,
  opts?: SubmitProfileOptions
): Promise<SubmissionResult> {
  const url = process.env.IMPACT_SUBMIT_URL?.trim();
  const body =
    opts?.dashboardSummary !== undefined
      ? buildSubmissionWireBody(profile, opts.dashboardSummary)
      : JSON.stringify(profile);
  const payload_sha256 = sha256Utf8(body);
  const timeoutMs = opts?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const maxAttempts = opts?.maxAttempts ?? DEFAULT_ATTEMPTS;

  if (!url) {
    return {
      ok: false,
      error:
        "No submission endpoint configured (set IMPACT_SUBMIT_URL). Local files are unchanged.",
      payload_sha256,
      attempts: 0,
    };
  }
  let lastStatus: number | undefined;
  let lastError: string | undefined;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    if (opts?.signal?.aborted) {
      return {
        ok: false,
        error: "Aborted",
        payload_sha256,
        attempts: attempt,
      };
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body,
        signal: controller.signal,
      });
      clearTimeout(timer);
      lastStatus = res.status;
      const text = await res.text();

      if (res.ok) {
        let submission_id = `http_${Date.now()}`;
        try {
          const j = JSON.parse(text) as { id?: string; submission_id?: string };
          submission_id = j.submission_id ?? j.id ?? submission_id;
        } catch {
          /* keep synthetic id */
        }
        return {
          ok: true,
          submission_id,
          payload_sha256,
          attempts: attempt + 1,
          raw: text,
        };
      }

      /** 409: duplicate / idempotent conflict — never retry; treat as resolved if server returns a stable id. */
      if (res.status === 409) {
        let submission_id = `duplicate_${profile.run_id}`;
        try {
          const j = JSON.parse(text) as { id?: string; submission_id?: string; message?: string };
          submission_id = j.submission_id ?? j.id ?? submission_id;
        } catch {
          /* synthetic id */
        }
        return {
          ok: true,
          submission_id,
          payload_sha256,
          attempts: attempt + 1,
          raw: text,
          duplicate: true,
        };
      }

      if (res.status === 400 || res.status === 401 || res.status === 403) {
        return {
          ok: false,
          error: `HTTP ${res.status}: ${text.slice(0, 500)}`,
          payload_sha256,
          attempts: attempt + 1,
          last_status: res.status,
        };
      }

      if (shouldRetryHttp(res.status) && attempt < maxAttempts - 1) {
        lastError = `HTTP ${res.status}: ${text.slice(0, 200)}`;
        await sleep(BACKOFF_MS[attempt] ?? 8000);
        continue;
      }

      return {
        ok: false,
        error: `HTTP ${res.status}: ${text.slice(0, 500)}`,
        payload_sha256,
        attempts: attempt + 1,
        last_status: res.status,
      };
    } catch (e) {
      clearTimeout(timer);
      const msg = e instanceof Error ? e.message : String(e);
      lastError = msg;
      const retryable = attempt < maxAttempts - 1 && !opts?.signal?.aborted;
      if (retryable) {
        await sleep(BACKOFF_MS[attempt] ?? 8000);
        continue;
      }
      return {
        ok: false,
        error: lastError ?? msg,
        payload_sha256,
        attempts: attempt + 1,
        last_status: lastStatus,
      };
    }
  }

  return {
    ok: false,
    error: lastError ?? "Exhausted retry attempts",
    payload_sha256,
    attempts: maxAttempts,
    last_status: lastStatus,
  };
}
