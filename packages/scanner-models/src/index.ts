import type { ModelRecord, RuntimeRecord } from "@doneisbetter/schemas";
import { fieldConfidence, ps } from "@doneisbetter/schemas";

type OllamaTagsResponse = {
  models?: Array<{ name: string; details?: { quantization_level?: string } }>;
};

export async function scanModelsForOllama(
  ollama: RuntimeRecord | undefined
): Promise<ModelRecord[]> {
  if (!ollama?.installed) return [];
  if (ollama.status === "installed_unreachable") return [];
  if (ollama.reachable !== true) return [];

  const probe = "GET http://127.0.0.1:11434/api/tags";
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 4000);
    const res = await fetch("http://127.0.0.1:11434/api/tags", {
      signal: ctrl.signal,
    });
    clearTimeout(t);
    if (!res.ok) {
      return [];
    }
    const body = (await res.json()) as OllamaTagsResponse;
    const models = body.models ?? [];
    return models.map((m) => {
      const q = m.details?.quantization_level ?? null;
      const row: ModelRecord = {
        id: m.name,
        runtime_id: "ollama",
        locality: "local",
        presence: "detected",
        source: "api",
        probe,
        confidence: fieldConfidence("model_from_ollama_api"),
      };
      if (q != null) {
        row.quantization = ps(q, "api", "ollama_json.details", fieldConfidence("model_from_ollama_api"));
      }
      return row;
    });
  } catch {
    return [];
  }
}

export function scanModelsForMlx(_mlx: RuntimeRecord | undefined): ModelRecord[] {
  return [];
}
