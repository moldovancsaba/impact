import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { buildFullStatsFromRows, toHardware, toModels, toOverview, toTools } from "../stats-core";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturePath = join(__dirname, "../../fixtures/baseline-profile.sample.json");

describe("stats-core", () => {
  it("builds overview/full/hardware/tools/models payloads", () => {
    const profile = JSON.parse(readFileSync(fixturePath, "utf8")) as unknown;
    const rows = [
      { profile_json: profile, dashboard_summary_json: null },
      { profile_json: profile, dashboard_summary_json: null },
      { profile_json: profile, dashboard_summary_json: null },
    ];

    const full = buildFullStatsFromRows(rows, 2);
    const overview = toOverview(full) as { submission_count: number; below_global_threshold: boolean };
    const hardware = toHardware(full) as { schema_version: string };
    const tools = toTools(full) as { schema_version: string };
    const models = toModels(full) as { schema_version: string };

    expect(full.schema_version).toBe("impact.stats.v0.1");
    expect(overview.submission_count).toBe(3);
    expect(overview.below_global_threshold).toBe(false);
    expect(hardware.schema_version).toBe("impact.stats.hardware.v0.1");
    expect(tools.schema_version).toBe("impact.stats.tools.v0.1");
    expect(models.schema_version).toBe("impact.stats.models.v0.1");
  });

  it("suppresses buckets below global threshold", () => {
    const profile = JSON.parse(readFileSync(fixturePath, "utf8")) as unknown;
    const rows = [{ profile_json: profile, dashboard_summary_json: null }];
    const full = buildFullStatsFromRows(rows, 5);
    expect(full.below_global_threshold).toBe(true);
    expect(full.hardware.machine_class).toEqual([]);
    expect(full.tools.tool_id).toEqual([]);
    expect(full.models.by_id_locality).toEqual([]);
  });
});
