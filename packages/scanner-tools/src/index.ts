import { execFile } from "node:child_process";
import os from "node:os";
import { promisify } from "node:util";
import type { ToolRecord } from "@doneisbetter/schemas";
import { fieldConfidence, ps } from "@doneisbetter/schemas";
import { TOOL_ALLOWLIST } from "./allowlist.js";

const execFileAsync = promisify(execFile);

async function which(binary: string): Promise<string | null> {
  const isWin = os.platform() === "win32";
  try {
    const { stdout } = await execFileAsync(isWin ? "where" : "which", [binary], {
      timeout: 3000,
      maxBuffer: 64 * 1024,
      windowsHide: true,
    });
    const line = stdout.trim().split(/\r?\n/)[0]?.trim();
    return line || null;
  } catch {
    return null;
  }
}

async function versionHint(binary: string): Promise<{ text: string | null; probe: string }> {
  for (const args of [["--version"], ["-v"], ["version"]] as const) {
    const probe = `${binary} ${args.join(" ")}`;
    try {
      const { stdout } = await execFileAsync(binary, [...args], {
        timeout: 4000,
        maxBuffer: 64 * 1024,
        windowsHide: true,
      });
      const first = stdout.trim().split(/\r?\n/)[0]?.trim();
      if (first) return { text: first.slice(0, 120), probe };
    } catch {
      /* try next */
    }
  }
  return { text: null, probe: `${binary} --version|-v|version` };
}

export async function scanTools(): Promise<ToolRecord[]> {
  const out: ToolRecord[] = [];
  for (const tool of TOOL_ALLOWLIST) {
    let path: string | null = null;
    let usedBin: string | null = null;
    for (const bin of tool.binaries) {
      path = await which(bin);
      if (path) {
        usedBin = bin;
        break;
      }
    }
    if (path && usedBin) {
      const { text, probe } = await versionHint(usedBin);
      const vConf = text ? fieldConfidence("tool_version_cli") : fieldConfidence("tool_version_probe_fail");
      out.push({
        id: tool.id,
        installed: true,
        version: ps(text, "command", probe, vConf),
        kind: tool.kind,
        presence: "detected",
      });
    } else {
      out.push({
        id: tool.id,
        installed: false,
        version: ps(null, "unknown", null, fieldConfidence("tool_which_miss")),
        kind: tool.kind,
        presence: "unknown",
      });
    }
  }
  return out;
}
