## Objective

Add a **diagnostics** surface that explains **partial / unknown / unsupported** outcomes using **only scan-derived facts**—in both **HTML** and **CLI**—so users get operational clarity without speculative storytelling.

## Unified Context

Tables of provenance are not enough for support. Users ask “why no models?” or “why is submission disabled?” Diagnostics must be **conservative**: if we did not probe, we say we did not probe—not guess driver bugs.

Without diagnostics:

- support load increases
- users assume the scanner is “broken” when the environment is partial
- MLX honest scope is buried in notes only

## Based On

- Sprint B — B8
- `packages/reporting/src/diagnostics.ts` — `buildDiagnostics`
- CLI post-scan summary in `apps/cli`
- [docs/support-matrix.md](https://github.com/sovereignsquad/impact/blob/main/docs/support-matrix.md)
- [docs/schema-semantics-v0.3.md](https://github.com/sovereignsquad/impact/blob/main/docs/schema-semantics-v0.3.md)
- [docs/confidence-rules.md](https://github.com/sovereignsquad/impact/blob/main/docs/confidence-rules.md)
- [docs/submission-contract.md](https://github.com/sovereignsquad/impact/blob/main/docs/submission-contract.md)

## Problem

Partial states were correct in JSON but **invisible** in the user journey.

## Goal

- HTML **Diagnostics** card from `buildDiagnostics(profile)`
- CLI prints bullet list after scan
- Wording plain; no claims beyond profile fields

## Scope

In scope: reporting + CLI only.

Out of scope: remote log upload; interactive debugger.

## Execution Prompt

Implement `buildDiagnostics`; call from `renderHtmlReport`; export from `@doneisbetter/reporting`; import in CLI after `writeHtmlReport`.

## Scope / Non-Goals

Non-goals: ML root-cause analysis; fixing user machines automatically.

## Constraints

- No **speculative** explanations (“maybe firewall”) unless tied to a probe flag (prefer omit)

## Acceptance Checks

- [ ] Diagnostics derive from actual profile state
- [ ] Submission-disabled reason when URL unset
- [ ] Unreachable runtime called out
- [ ] MLX partial notes surface in diagnostics when applicable

## Dependencies

- **Related:** #17, #19 (HTML tests may assert diagnostics copy)

## Out of Scope

- Desktop notifications

## Risks

- Over-chatty diagnostics — cap list length or merge similar lines later

## Delivery Artifact

- `diagnostics.ts` + HTML + CLI output

## Developer Notes

- Style reference: [mvp-factory-control#498](https://github.com/moldovancsaba/mvp-factory-control/issues/498)
