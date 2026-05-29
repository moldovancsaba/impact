import { describe, expect, it } from "vitest";
import { coarseReadiness } from "./readiness.js";
import type { ImpactProfile } from "@doneisbetter/schemas";
import { pn, ps, pbool, pi } from "@doneisbetter/schemas";

function baseProfile(overrides: Partial<ImpactProfile> = {}): ImpactProfile {
  const host: ImpactProfile["host"] = {
    machine_class: ps("test", "derived", "impact:machine_class", "low"),
    fingerprint_hash: ps("sha256:x", "derived", "impact:fingerprint", "high"),
    os_name: ps("macOS", "derived", "node:os", "high"),
    os_version: ps("14.0", "derived", "node:os.release", "high"),
    architecture: ps("arm64", "derived", "node:os.arch", "high"),
    chip: ps("Apple M1 Pro", "derived", "node:os.cpus", "high"),
    memory_gb: pn(16, "derived", "node:os.totalmem", "high"),
    core_count: pi(10, "derived", "node:os.cpus.length", "high"),
    gpu_acceleration: {
      metal_available: pbool(true, "derived", "impact:metal_hint", "medium"),
    },
    disk: { free_gb: pn(100, "command", "df", "medium") },
  };

  return {
    schema_version: "impact.v0.3",
    run_id: "550e8400-e29b-41d4-a716-446655440000",
    created_at: "2026-04-03T12:00:00.000Z",
    host,
    runtimes: [
      {
        id: "ollama",
        status: "installed_reachable",
        installed: true,
        reachable: true,
        version: ps("0.3.0", "command", "ollama --version", "high"),
        presence: "detected",
        capabilities: { model_inventory: "full" },
      },
    ],
    tools: [],
    models: [
      {
        id: "llama3.1:8b",
        runtime_id: "ollama",
        locality: "local",
        presence: "detected",
        source: "api",
        probe: "ollama_tags",
        confidence: "high",
      },
    ],
    privacy: { raw_identifiers_stored: false, consent_required_for_submission: true },
    ...overrides,
  };
}

describe("coarseReadiness", () => {
  it("suggests lightweight local workflows when signals align", () => {
    const r = coarseReadiness(baseProfile());
    expect(r?.presence).toBe("inferred");
    expect(r?.summary.toLowerCase()).toContain("lightweight");
  });

  it("flags unreachable Ollama", () => {
    const p = baseProfile({
      runtimes: [
        {
          id: "ollama",
          status: "installed_unreachable",
          installed: true,
          reachable: false,
          version: ps("0.3.0", "command", "ollama --version", "high"),
          presence: "detected",
          capabilities: { model_inventory: "partial" },
        },
      ],
      models: [],
    });
    const r = coarseReadiness(p);
    expect(r?.summary.toLowerCase()).toContain("not reachable");
    expect(r?.presence).toBe("detected");
  });
});
