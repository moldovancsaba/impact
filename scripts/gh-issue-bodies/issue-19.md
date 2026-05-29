## Objective

Prove the **HTML report** is part of the **trust boundary**: partial, unreachable, unknown, and MLX “honest scope” states render **correctly and verifiably**, not only that a file was written.

## Unified Context

Users who are not engineers still read **`impact-report.html`**. If we only test JSON schema, the report can silently regress (wrong column headers, missing footer, broken provenance). Fixture-driven **string assertions** catch semantic drift before release.

Failure modes without tests:

- readiness still shows old “confidence” label instead of **`presence`**
- MLX yellow card disappears
- “What we did not collect” section vanishes
- diagnostics block missing for unreachable Ollama

## Based On

- Sprint B — B3
- `packages/reporting/src/html.test.ts` + validated fixtures under `fixtures/`
- [docs/confidence-rules.md](https://github.com/sovereignsquad/impact/blob/main/docs/confidence-rules.md)
- [docs/schema-semantics-v0.3.md](https://github.com/sovereignsquad/impact/blob/main/docs/schema-semantics-v0.3.md)
- [docs/support-matrix.md](https://github.com/sovereignsquad/impact/blob/main/docs/support-matrix.md)
- [docs/submission-contract.md](https://github.com/sovereignsquad/impact/blob/main/docs/submission-contract.md)

## Problem

Report correctness was assumed; Sprint B makes it **tested**.

## Goal

Vitest suite loads **`validateImpactProfile`** fixtures and asserts:

- confidence legend + support footer + omission section
- MLX card + `model_inventory` / honest messaging
- unreachable runtime + diagnostics copy
- presence columns (not legacy `semantic` / `discovery_status`)
- readiness block uses **presence** vocabulary

## Scope

In scope: `@doneisbetter/reporting` tests, small refactors for testability.

Out of scope: visual pixel tests, browser E2E.

## Execution Prompt

Add `vitest` to `@doneisbetter/reporting`; implement `renderHtmlReport` tests against `fixtures/baseline-profile.sample.json` and `fixtures/scenarios/*`; gate in root `npm test`.

## Scope / Non-Goals

Non-goals: screenshot diffing; testing every CSS pixel.

## Constraints

- Tests use **validated** profile objects only (no invalid HTML inputs)

## Acceptance Checks

- [ ] Report tests run in CI
- [ ] Assertions target **meaningful substrings**, not only `<html>`
- [ ] MLX partial scenario explicitly asserted
- [ ] Unreachable Ollama scenario asserts diagnostics

## Dependencies

- **Depends on:** #17 (v0.3 profile shape)
- **Pairs with:** #20 (fixtures)

## Out of Scope

- PDF export
- Theming

## Risks

- Brittle substring tests — prefer stable copy from product doc

## Delivery Artifact

- `html.test.ts` + `vitest.config.ts` in reporting package

## Developer Notes

- Style reference: [mvp-factory-control#498](https://github.com/moldovancsaba/mvp-factory-control/issues/498)
