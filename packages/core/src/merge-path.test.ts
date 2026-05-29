import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { validateImpactProfile } from "@doneisbetter/schemas";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../../fixtures/scenarios");

function loadScenario(name: string) {
  const raw = readFileSync(join(root, name), "utf8");
  return validateImpactProfile(JSON.parse(raw));
}

describe("profile merge / fixture orchestration", () => {
  it("mixed-runtime-states validates and preserves distinct runtime statuses", () => {
    const p = loadScenario("mixed-runtime-states.json");
    const ollama = p.runtimes.find((r) => r.id === "ollama");
    const mlx = p.runtimes.find((r) => r.id === "mlx_python");
    expect(ollama?.status).toBe("installed_unreachable");
    expect(ollama?.presence).toBe("detected");
    expect(mlx?.status).toBe("partial");
    expect(mlx?.presence).toBe("detected");
    expect(p.tools[0]?.presence).toBe("detected");
  });

  it("stable JSON serialization for the same validated object", () => {
    const p = loadScenario("ollama-reachable-with-models.json");
    expect(JSON.stringify(p)).toBe(JSON.stringify(validateImpactProfile(JSON.parse(JSON.stringify(p)))));
  });

  it("tool-detected-version-unknown keeps presence detected with unknown version confidence", () => {
    const p = loadScenario("tool-detected-version-unknown.json");
    const t = p.tools.find((x) => x.id === "codex_cli");
    expect(t?.installed).toBe(true);
    expect(t?.presence).toBe("detected");
    expect(t?.version.confidence).toBe("unknown");
  });
});
