import type { RuntimeRecord } from "@doneisbetter/schemas";
import { fieldConfidence, ps } from "@doneisbetter/schemas";
import { execText } from "./exec.js";

const OLLAMA_TIMEOUT_MS = 4000;

async function ollamaVersion(): Promise<string | null> {
  const out = await execText("ollama", ["--version"], OLLAMA_TIMEOUT_MS);
  if (!out) return null;
  const m = out.match(/ollama\s+version\s+([\w.-]+)/i) ?? out.match(/([\d.]+)/);
  return m?.[1] ?? out.split(/\s+/)[0] ?? null;
}

async function ollamaReachable(): Promise<boolean> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 2500);
    const res = await fetch("http://127.0.0.1:11434/api/tags", {
      signal: ctrl.signal,
    });
    clearTimeout(t);
    return res.ok;
  } catch {
    return false;
  }
}

export async function scanRuntimes(): Promise<RuntimeRecord[]> {
  const versionStr = await ollamaVersion();
  const installed = versionStr != null;
  const versionProbe = "ollama --version";

  let ollama: RuntimeRecord;
  if (!installed) {
    ollama = {
      id: "ollama",
      status: "not_installed",
      installed: false,
      reachable: null,
      version: ps(null, "command", versionProbe, fieldConfidence("ollama_version_missing")),
      presence: "unknown",
      capabilities: { model_inventory: "none", notes: "Ollama not found on PATH." },
    };
  } else {
    const reachable = await ollamaReachable();
    ollama = {
      id: "ollama",
      status: reachable ? "installed_reachable" : "installed_unreachable",
      installed: true,
      reachable,
      version: ps(versionStr, "command", versionProbe, fieldConfidence("ollama_version_cli")),
      /** Binary/version probe succeeded — epistemic detection; reachability is in `status` */
      presence: "detected",
      capabilities: {
        model_inventory: reachable ? "full" : "partial",
        notes: reachable
          ? "Model list via local Ollama HTTP API."
          : "Binary present but local API not reachable; model inventory skipped.",
      },
    };
  }

  const mlx = await detectMlx();
  return [ollama, mlx];
}

async function detectMlx(): Promise<RuntimeRecord> {
  const pipProbe = "python3 -m pip show mlx";
  const pipShow = await execText("python3", ["-m", "pip", "show", "mlx"], 5000);
  const hasMlx = pipShow?.toLowerCase().includes("name: mlx") ?? false;
  let versionStr: string | null = null;
  if (hasMlx) {
    const verLine = pipShow?.split(/\n/).find((l) => l.toLowerCase().startsWith("version:"));
    versionStr = verLine?.split(":")[1]?.trim() ?? null;
  }

  if (!hasMlx) {
    return {
      id: "mlx_python",
      status: "not_installed",
      installed: false,
      reachable: null,
      version: ps(null, "command", pipProbe, fieldConfidence("mlx_pip_absent")),
      presence: "unknown",
      capabilities: {
        model_inventory: "none",
        notes: "MLX Python package not reported by pip.",
      },
    };
  }

  return {
    id: "mlx_python",
    status: "partial",
    installed: true,
    reachable: null,
    version: ps(versionStr, "command", pipProbe, fieldConfidence("mlx_pip_show")),
    presence: "detected",
    capabilities: {
      model_inventory: "none",
      notes:
        "MLX Python package detected only. Model inventory is not configured in v0.x (no path policy); do not treat as full MLX support.",
    },
  };
}
