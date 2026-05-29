import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import type { DashboardSummary } from "@doneisbetter/schemas";
import { validateImpactProfile } from "@doneisbetter/schemas";
import {
  accumulateDashboardSummary,
  accumulateProfile,
  applyPrivacyThreshold,
  buildPublicStats,
  buildPublicStatsFromRollup,
  emptyRollup,
  memoryBandGb,
} from "./aggregate.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturePath = join(__dirname, "../../../fixtures/baseline-profile.sample.json");

describe("memoryBandGb", () => {
  it("buckets", () => {
    expect(memoryBandGb(4)).toBe("under_8gb");
    expect(memoryBandGb(16)).toBe("16_32gb");
    expect(memoryBandGb(128)).toBe("64gb_plus");
  });
});

describe("applyPrivacyThreshold", () => {
  it("drops small buckets", () => {
    const m = new Map([
      ["a", 10],
      ["b", 2],
      ["c", 5],
    ]);
    expect(applyPrivacyThreshold(m, 5, 10)).toEqual([
      { key: "a", count: 10 },
      { key: "c", count: 5 },
    ]);
  });
});

describe("buildPublicStats", () => {
  it("suppresses all dimension buckets when below global threshold", () => {
    const p = validateImpactProfile(JSON.parse(readFileSync(fixturePath, "utf8")) as object);
    const stats = buildPublicStats([p], 5);
    expect(stats.submission_count).toBe(1);
    expect(stats.below_global_threshold).toBe(true);
    expect(stats.hardware.machine_class).toEqual([]);
  });

  it("publishes buckets when global threshold met", () => {
    const p = validateImpactProfile(JSON.parse(readFileSync(fixturePath, "utf8")) as object);
    const stats = buildPublicStats([p, p, p, p, p], 1);
    expect(stats.below_global_threshold).toBe(false);
    expect(stats.hardware.machine_class.length).toBeGreaterThan(0);
  });

  it("accumulates multiple profiles", () => {
    const p = validateImpactProfile(JSON.parse(readFileSync(fixturePath, "utf8")) as object);
    const r = emptyRollup();
    accumulateProfile(r, p);
    accumulateProfile(r, p);
    expect(r.submission_count).toBe(2);
    const stats = buildPublicStats([p, p], 1);
    expect(stats.submission_count).toBe(2);
  });

  it("accumulates dashboard summary into rollup", () => {
    const summary: DashboardSummary = {
      summary_version: "impact.summary.v0.1",
      profile_schema_version: "impact.v0.3",
      platform_family: "macos",
      machine_class: "laptop_test",
      chip_family: "apple_m_series",
      memory_band_gb: "16_32gb",
      runtime_families: ["ollama"],
      tool_families: ["codex_cli"],
      model_families: ["llama"],
      local_model_count: 1,
      cloud_tool_present: false,
      reachable_runtime_count: 1,
      partial_runtime_count: 0,
      architecture: "arm64",
    };
    const r = emptyRollup();
    accumulateDashboardSummary(r, summary);
    expect(r.submission_count).toBe(1);
    expect(r.machine_class.get("laptop_test")).toBe(1);
    expect(r.chip.get("apple_m_series")).toBe(1);
    const stats = buildPublicStatsFromRollup(r, 1);
    expect(stats.below_global_threshold).toBe(false);
    expect(stats.hardware.machine_class.some((b) => b.key === "laptop_test")).toBe(true);
  });
});
