import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { DashboardSummary, ImpactProfile } from "@doneisbetter/schemas";
import { renderHtmlReport } from "./html.js";

export { renderHtmlReport };
export { buildDiagnostics } from "./diagnostics.js";
export { buildRecommendations } from "./recommendations.js";
export type { Recommendation } from "./recommendations.js";

async function ensureDir(dir: string): Promise<void> {
  await mkdir(dir, { recursive: true });
}

export async function writeJsonReport(dir: string, profile: ImpactProfile): Promise<string> {
  await ensureDir(dir);
  const file = path.join(dir, "impact-profile.json");
  await writeFile(file, `${JSON.stringify(profile, null, 2)}\n`, "utf8");
  return file;
}

export async function writeHtmlReport(dir: string, profile: ImpactProfile): Promise<string> {
  await ensureDir(dir);
  const file = path.join(dir, "impact-report.html");
  await writeFile(file, renderHtmlReport(profile), "utf8");
  return file;
}

export async function writeDashboardSummaryJson(dir: string, summary: DashboardSummary): Promise<string> {
  await ensureDir(dir);
  const file = path.join(dir, "impact-dashboard-summary.json");
  await writeFile(file, `${JSON.stringify(summary, null, 2)}\n`, "utf8");
  return file;
}
