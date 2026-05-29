import { randomUUID } from "node:crypto";
import { ImpactProfileSchema, type ImpactProfile, type ToolRecord } from "@doneisbetter/schemas";
import { loadOrCreateSalt, privacyBlock } from "@doneisbetter/privacy";
import { scanHost } from "@doneisbetter/scanner-host";
import { scanModelsForMlx, scanModelsForOllama } from "@doneisbetter/scanner-models";
import { scanRuntimes } from "@doneisbetter/scanner-runtimes";
import { scanTools } from "@doneisbetter/scanner-tools";
import { coarseReadiness } from "./readiness.js";

export type ScanOptions = {
  /** Include coarse readiness text (P1 / Phase 2 style); default true */
  includeReadiness?: boolean;
};

/**
 * Full local scan: host, runtimes, tools (allowlist), models, privacy block, optional readiness.
 */
export async function runScan(opts: ScanOptions = {}): Promise<ImpactProfile> {
  const includeReadiness = opts.includeReadiness !== false;
  const salt = await loadOrCreateSalt();

  const [host, runtimes, toolsRaw] = await Promise.all([
    scanHost(salt),
    scanRuntimes(),
    scanTools(),
  ]);

  const ollama = runtimes.find((r) => r.id === "ollama");
  const mlx = runtimes.find((r) => r.id === "mlx_python");
  const [ollamaModels, mlxModels] = await Promise.all([
    scanModelsForOllama(ollama),
    Promise.resolve(scanModelsForMlx(mlx)),
  ]);
  const models = [...ollamaModels, ...mlxModels];

  const tools: ToolRecord[] = toolsRaw.filter((t) => t.installed);

  const base: ImpactProfile = {
    schema_version: "impact.v0.3",
    run_id: randomUUID(),
    created_at: new Date().toISOString(),
    host,
    runtimes,
    tools,
    models,
    privacy: privacyBlock(),
  };

  const withReadiness = includeReadiness
    ? { ...base, readiness: coarseReadiness(base) ?? undefined }
    : base;

  return ImpactProfileSchema.parse(withReadiness);
}
