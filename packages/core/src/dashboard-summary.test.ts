import { describe, expect, it } from "vitest";
import type { ImpactProfile } from "@doneisbetter/schemas";
import { buildDashboardSummary, memoryBandGbLabel, modelFamilyFromId } from "./dashboard-summary.js";

const minimalProfile = (): ImpactProfile => ({
  schema_version: "impact.v0.3",
  run_id: "550e8400-e29b-41d4-a716-446655440000",
  created_at: "2026-04-03T12:00:00.000Z",
  host: {
    machine_class: { value: "laptop_arm", source: "derived", probe: "m", confidence: "low" },
    fingerprint_hash: { value: "sha256:a", source: "derived", probe: "f", confidence: "high" },
    os_name: { value: "macOS", source: "derived", probe: "o", confidence: "high" },
    os_version: { value: "14", source: "derived", probe: "r", confidence: "high" },
    architecture: { value: "arm64", source: "derived", probe: "a", confidence: "high" },
    chip: { value: "Apple M2", source: "derived", probe: "c", confidence: "medium" },
    memory_gb: { value: 24, source: "derived", probe: "mem", confidence: "high" },
  },
  runtimes: [
    {
      id: "ollama",
      status: "installed_reachable",
      installed: true,
      reachable: true,
      version: { value: "1", source: "command", probe: "p", confidence: "high" },
      presence: "detected",
    },
    {
      id: "mlx_python",
      status: "partial",
      installed: true,
      reachable: null,
      version: { value: "1", source: "command", probe: "p", confidence: "high" },
      presence: "detected",
    },
  ],
  tools: [{ id: "codex_cli", installed: true, version: { value: "x", source: "command", probe: "p", confidence: "high" }, kind: "agent", presence: "detected" }],
  models: [
    {
      id: "llama3.1:8b",
      runtime_id: "ollama",
      locality: "local",
      presence: "detected",
      source: "api",
      probe: null,
      confidence: "high",
    },
  ],
  privacy: { raw_identifiers_stored: false, consent_required_for_submission: true },
});

describe("modelFamilyFromId", () => {
  it("takes first coarse token", () => {
    expect(modelFamilyFromId("llama3.1:8b")).toBe("llama3");
    expect(modelFamilyFromId("qwen2.5-coder")).toBe("qwen2");
  });
});

describe("memoryBandGbLabel", () => {
  it("matches aggregate bands", () => {
    expect(memoryBandGbLabel(4)).toBe("under_8gb");
    expect(memoryBandGbLabel(16)).toBe("16_32gb");
  });
});

describe("buildDashboardSummary", () => {
  it("produces impact.summary.v0.1", () => {
    const s = buildDashboardSummary(minimalProfile());
    expect(s.summary_version).toBe("impact.summary.v0.1");
    expect(s.profile_schema_version).toBe("impact.v0.3");
    expect(s.platform_family).toBe("macos");
    expect(s.chip_family).toBe("apple_m_series");
    expect(s.reachable_runtime_count).toBe(1);
    expect(s.partial_runtime_count).toBe(1);
    expect(s.runtime_families).toContain("ollama");
    expect(s.runtime_families).toContain("mlx_python");
    expect(s.local_model_count).toBe(1);
    expect(s.cloud_tool_present).toBe(false);
    expect(s.model_families).toContain("llama3");
  });
});
