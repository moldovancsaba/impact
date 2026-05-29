import { afterEach, describe, expect, it, vi } from "vitest";
import type { ImpactProfile } from "@doneisbetter/schemas";
import { buildSubmissionWireBody, submitProfile } from "./submit-profile.js";

const minimalProfile = (): ImpactProfile => ({
  schema_version: "impact.v0.3",
  run_id: "550e8400-e29b-41d4-a716-446655440000",
  created_at: "2026-04-03T12:00:00.000Z",
  host: {
    machine_class: { value: "x", source: "derived", probe: "m", confidence: "low" },
    fingerprint_hash: { value: "sha256:a", source: "derived", probe: "f", confidence: "high" },
    os_name: { value: "macOS", source: "derived", probe: "o", confidence: "high" },
    os_version: { value: "14", source: "derived", probe: "r", confidence: "high" },
    architecture: { value: "arm64", source: "derived", probe: "a", confidence: "high" },
    chip: { value: "M1", source: "derived", probe: "c", confidence: "medium" },
    memory_gb: { value: 8, source: "derived", probe: "mem", confidence: "high" },
  },
  runtimes: [],
  tools: [],
  models: [],
  privacy: { raw_identifiers_stored: false, consent_required_for_submission: true },
});

const minimalSummary = () => ({
  summary_version: "impact.summary.v0.1" as const,
  profile_schema_version: "impact.v0.3" as const,
  platform_family: "macos" as const,
  machine_class: "x",
  chip_family: "apple_m_series",
  memory_band_gb: "8_16gb",
  runtime_families: [] as string[],
  tool_families: [] as string[],
  model_families: [] as string[],
  local_model_count: 0,
  cloud_tool_present: false,
  reachable_runtime_count: 0,
  partial_runtime_count: 0,
});

describe("submitProfile", () => {
  const prevUrl = process.env.IMPACT_SUBMIT_URL;

  afterEach(() => {
    vi.unstubAllGlobals();
    if (prevUrl === undefined) delete process.env.IMPACT_SUBMIT_URL;
    else process.env.IMPACT_SUBMIT_URL = prevUrl;
  });

  it("returns error when IMPACT_SUBMIT_URL unset", async () => {
    delete process.env.IMPACT_SUBMIT_URL;
    const r = await submitProfile(minimalProfile());
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.attempts).toBe(0);
      expect(r.error).toContain("IMPACT_SUBMIT_URL");
    }
  });

  it("parses JSON body on success", async () => {
    process.env.IMPACT_SUBMIT_URL = "https://example.com/ingest";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        text: async () => JSON.stringify({ submission_id: "srv-1" }),
      })
    );
    const r = await submitProfile(minimalProfile(), { timeoutMs: 5000, maxAttempts: 1 });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.submission_id).toBe("srv-1");
  });

  it("POSTs envelope when dashboardSummary is set", async () => {
    process.env.IMPACT_SUBMIT_URL = "https://example.com/ingest";
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ submission_id: "e1" }),
    });
    vi.stubGlobal("fetch", fetchMock);
    const profile = minimalProfile();
    const summary = minimalSummary();
    await submitProfile(profile, { dashboardSummary: summary, timeoutMs: 5000, maxAttempts: 1 });
    const call = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = call[1].body as string;
    expect(body).toContain("impact.submission.v0.1");
    expect(body).toContain("dashboard_summary");
    expect(buildSubmissionWireBody(profile, summary)).toBe(body);
  });

  it("retries on 500 then succeeds", async () => {
    process.env.IMPACT_SUBMIT_URL = "https://example.com/ingest";
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 503,
        text: async () => "unavailable",
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => JSON.stringify({ id: "retry-ok" }),
      });
    vi.stubGlobal("fetch", fetchMock);
    const r = await submitProfile(minimalProfile(), {
      timeoutMs: 5000,
      maxAttempts: 3,
    });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.submission_id).toBe("retry-ok");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("treats 409 as success with duplicate flag (no retry)", async () => {
    process.env.IMPACT_SUBMIT_URL = "https://example.com/ingest";
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 409,
      text: async () => JSON.stringify({ submission_id: "prior-1", message: "already ingested" }),
    });
    vi.stubGlobal("fetch", fetchMock);
    const r = await submitProfile(minimalProfile(), { timeoutMs: 5000, maxAttempts: 3 });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.duplicate).toBe(true);
      expect(r.submission_id).toBe("prior-1");
    }
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("does not retry on 400", async () => {
    process.env.IMPACT_SUBMIT_URL = "https://example.com/ingest";
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      text: async () => "bad request",
    });
    vi.stubGlobal("fetch", fetchMock);
    const r = await submitProfile(minimalProfile(), { timeoutMs: 5000, maxAttempts: 3 });
    expect(r.ok).toBe(false);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
