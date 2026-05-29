import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { validateImpactProfile, type ImpactProfile } from "@doneisbetter/schemas";
import { renderHtmlReport } from "./html.js";

const fixtures = join(dirname(fileURLToPath(import.meta.url)), "../../../fixtures");

function loadFixture(rel: string): ImpactProfile {
  const raw = readFileSync(join(fixtures, rel), "utf8");
  return validateImpactProfile(JSON.parse(raw));
}

describe("renderHtmlReport", () => {
  const prev = process.env.IMPACT_SUBMIT_URL;

  beforeEach(() => {
    delete process.env.IMPACT_SUBMIT_URL;
  });

  afterEach(() => {
    if (prev === undefined) delete process.env.IMPACT_SUBMIT_URL;
    else process.env.IMPACT_SUBMIT_URL = prev;
  });

  it("includes confidence legend, support footer, and omission section", () => {
    const html = renderHtmlReport(loadFixture("baseline-profile.sample.json"));
    expect(html).toContain("Field confidence (legend)");
    expect(html).toContain("high</strong> — direct successful probe");
    expect(html).toContain("docs/confidence-rules.md");
    expect(html).toContain("What we did <em>not</em> collect");
    expect(html).toContain("Platform support (this build)");
    expect(html).toContain("docs/support-matrix.md");
  });

  it("renders MLX honest-scope card when mlx_python is installed", () => {
    const html = renderHtmlReport(loadFixture("scenarios/mlx-partial-no-models.json"));
    expect(html).toContain("MLX support (honest scope)");
    expect(html).toContain("Model inventory support:");
    expect(html).toMatch(/Model inventory<\/th>[\s\S]*<td>none<\/td>/);
    expect(html).toContain("do not treat as full MLX support");
  });

  it("shows unreachable runtime in table and diagnostics", () => {
    const html = renderHtmlReport(loadFixture("scenarios/ollama-unreachable.json"));
    expect(html).toContain("installed_unreachable");
    expect(html).toContain("Diagnostics");
    expect(html).toContain("did not respond");
  });

  it("uses presence column for runtimes and models", () => {
    const html = renderHtmlReport(loadFixture("baseline-profile.sample.json"));
    expect(html).toContain("<th>Presence</th>");
    expect(html).toContain("<code>detected</code>");
    expect(html).not.toContain("<th>Semantic</th>");
    expect(html).not.toContain("discovery_status");
  });

  it("readiness block uses presence not confidence label", () => {
    const html = renderHtmlReport(loadFixture("baseline-profile.sample.json"));
    expect(html).toContain("Presence (epistemic basis)");
    expect(html).toContain("inferred");
  });

  it("includes MLP-style overview sections", () => {
    const html = renderHtmlReport(loadFixture("baseline-profile.sample.json"));
    expect(html).toContain("At a glance");
    expect(html).toContain("What this scan means");
    expect(html).toContain("Suggested next steps");
    expect(html).toContain("Known limitations (this product version)");
  });

  it("suggested steps mention unreachable runtime when applicable", () => {
    const html = renderHtmlReport(loadFixture("scenarios/ollama-unreachable.json"));
    expect(html).toContain("Bring “ollama” online");
  });
});
