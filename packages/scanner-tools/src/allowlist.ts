import type { ToolKind } from "@doneisbetter/schemas";

export type AllowlistedTool = {
  id: string;
  /** Binary name(s) on PATH */
  binaries: string[];
  kind: ToolKind;
};

/**
 * Curated allowlist only — no arbitrary filesystem discovery (product principle).
 * Extend via issues on the project board.
 */
export const TOOL_ALLOWLIST: AllowlistedTool[] = [
  { id: "cursor_cli", binaries: ["cursor"], kind: "editor" },
  { id: "code_cli", binaries: ["code"], kind: "editor" },
  { id: "windsurf_cli", binaries: ["windsurf"], kind: "editor" },
  { id: "codex_cli", binaries: ["codex"], kind: "agent" },
  { id: "claude_code_cli", binaries: ["claude"], kind: "agent" },
  { id: "ollama_cli", binaries: ["ollama"], kind: "runtime_ui" },
];
