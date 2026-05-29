## Objective

Detect **curated AI-adjacent tools** from a **maintained allowlist** (PATH binaries + coarse version strings), classifying **kind** (editor, agent, runtime UI, terminal tool). **No** broad filesystem search—**allowlist only** to preserve trust and predictability.

## Unified Context

Tool sprawl is infinite; **governance** is mandatory. This scanner intentionally **ignores** unknown tools. That is a **product decision**, not a gap—documented for global contributors.

## Based On

- `packages/scanner-tools/src/allowlist.ts`
- `ToolRecordSchema` in `@doneisbetter/schemas`

## Problem

Without an allowlist, “tool discovery” becomes spyware-adjacent and unmaintainable.

## Goal

- Expand allowlist via **reviewed PRs** only.
- Normalise version output (truncate, single line).
- Windows: `where`, Unix: `which`.

## Scope

In scope: allowlist + detection. Out of scope: desktop app bundle scraping (unless explicitly added later with privacy review).

## Execution Prompt

Each new tool: issue → privacy note → PR updating allowlist + docs.

## Constraints

- Never execute arbitrary user-configured commands from profiles.

## Acceptance Checks

- [ ] Only allowlisted IDs appear in exported `tools` (installed ones) per current product rules.
- [ ] Missing binaries → no crash; omitted or marked not installed per merge logic in core.
- [ ] `kind` always one of schema enums.

## Dependencies

- **Depends on:** #6

## Risks

- **PATH spoofing**—document that detection is best-effort for honest environments.

## Delivery Artifact

- Allowlist file + tests when added (#15).

## Developer Notes

- Title has **no** workflow prefix; use board **Status**.

- Programme card quality bar: [mvp-factory-control#498](https://github.com/moldovancsaba/mvp-factory-control/issues/498).
