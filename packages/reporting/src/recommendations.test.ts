import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { validateImpactProfile, type ImpactProfile } from "@doneisbetter/schemas";
import { buildRecommendations } from "./recommendations.js";

const fixtures = join(dirname(fileURLToPath(import.meta.url)), "../../../fixtures");

function loadFixture(rel: string): ImpactProfile {
  const raw = readFileSync(join(fixtures, rel), "utf8");
  return validateImpactProfile(JSON.parse(raw));
}

describe("buildRecommendations", () => {
  it("suggests bringing unreachable runtime online", () => {
    const recs = buildRecommendations(loadFixture("scenarios/ollama-unreachable.json"));
    const hit = recs.find((r) => r.rule_id === "action.runtime_api_unreachable:ollama");
    expect(hit).toBeDefined();
    expect(hit?.title).toContain("ollama");
    expect(hit?.evidence.some((e) => e.includes("installed_unreachable"))).toBe(true);
  });

  it("does not duplicate no-reachable note when a runtime is unreachable", () => {
    const recs = buildRecommendations(loadFixture("scenarios/ollama-unreachable.json"));
    expect(recs.some((r) => r.rule_id === "note.no_models_and_no_reachable_runtime")).toBe(false);
  });

  it("notes MLX inventory scope when MLX is installed without full inventory", () => {
    const recs = buildRecommendations(loadFixture("baseline-profile.sample.json"));
    expect(recs.some((r) => r.rule_id === "note.mlx_inventory_scope")).toBe(true);
  });

  it("suggests models when reachable runtime but zero models", () => {
    const p = loadFixture("baseline-profile.sample.json");
    const p2: ImpactProfile = {
      ...p,
      models: [],
    };
    const recs = buildRecommendations(p2);
    expect(recs.some((r) => r.rule_id === "action.no_models_enumerated")).toBe(true);
  });

  it("sorts by rule_id", () => {
    const recs = buildRecommendations(loadFixture("scenarios/mlx-partial-no-models.json"));
    const ids = recs.map((r) => r.rule_id);
    const sorted = [...ids].sort((a, b) => a.localeCompare(b));
    expect(ids).toEqual(sorted);
  });
});
