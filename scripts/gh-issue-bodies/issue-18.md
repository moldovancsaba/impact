## Objective

Make per-field **`confidence`** **machine-assigned, deterministic, and explainable** so reports and downstream systems never treat confidence as decoration or opinion.

## Unified Context

IMPACT reports show **source · probe · confidence** beside values. If confidence is assigned ad hoc, users cannot compare scans, file bugs, or trust aggregation. Rule ids must map to a **single SSOT** document and a **shared helper** in `@doneisbetter/schemas`.

Without this:

- “high” and “medium” become aesthetic
- MLX pip-only vs Ollama API success cannot be distinguished honestly
- CTO acceptance (“deterministic confidence”) is not enforceable

## Based On

- Sprint B — B2
- [docs/confidence-rules.md](https://github.com/sovereignsquad/impact/blob/main/docs/confidence-rules.md)
- `packages/schemas/src/confidence-rules.ts` — `ConfidenceRules`, `fieldConfidence()`
- [docs/schema-semantics-v0.3.md](https://github.com/sovereignsquad/impact/blob/main/docs/schema-semantics-v0.3.md)
- [docs/support-matrix.md](https://github.com/sovereignsquad/impact/blob/main/docs/support-matrix.md)
- [docs/submission-contract.md](https://github.com/sovereignsquad/impact/blob/main/docs/submission-contract.md)

## Problem

Confidence without documented rules becomes **non-actionable** and breaks trust in the HTML “epistemic discipline” story.

## Goal

- One **normative** markdown doc with examples (host chip, memory, Ollama version, reachability, MLX pip, tool version fail, model from API).
- Scanners call **`fieldConfidence('rule_id')`** (or equivalent) and reference rule ids in code comments where practical.
- HTML **confidence legend** mirrors the doc.

## Scope

In scope: docs, shared helper, scanner wiring, report legend cross-link.

Out of scope: benchmark scoring, ML-based confidence, user-editable confidence.

## Execution Prompt

Extend `ConfidenceRules` + `fieldConfidence()`; update `scanner-host`, `scanner-runtimes`, `scanner-tools`, `scanner-models` to use rule ids; ensure `docs/confidence-rules.md` lists every rule id emitted in v0.3.

## Scope / Non-Goals

Non-goals: subjective “importance” scores; hiding low confidence behind averages.

## Constraints

- New rule id ⇒ doc row + map entry in same PR
- Levels only: `high` | `medium` | `low` | `unknown`

## Acceptance Checks

- [ ] `docs/confidence-rules.md` is complete for shipped probes
- [ ] No scanner assigns field confidence without a documented rule id
- [ ] Report legend references the doc
- [ ] CI green

## Dependencies

- **Recommended after:** #17 (schema v0.3)
- **Feeds:** #19 (report tests cite legend text)

## Out of Scope

- Server ingest confidence
- Third-party probe plugins

## Risks

- Rule sprawl — keep ids coarse-grained; extend table not prose only

## Delivery Artifact

- `docs/confidence-rules.md` + `confidence-rules.ts` updates
- HTML legend in `@doneisbetter/reporting`

## Developer Notes

- Style reference: [mvp-factory-control#498](https://github.com/moldovancsaba/mvp-factory-control/issues/498)
