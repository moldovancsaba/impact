## Objective

**MLP M3 — Conservative recommendation engine:** deterministic, **explainable** guidance from **discovered facts** only (e.g. local 7B-class suitability, runtime unreachable, lightweight experimentation vs cloud-first for heavy flows). **No** opaque scores; **no** fake precision.

## Unified Context

Programme: [docs/mlp.md](https://github.com/sovereignsquad/impact/blob/main/docs/mlp.md). Recommendations are **interpretation**, not benchmarks. Prefer `@doneisbetter/core` or a small new module with **rule ids** + **evidence pointers** tied to profile fields.

## Based On

- [mlp.md — M3](https://github.com/sovereignsquad/impact/blob/main/docs/mlp.md#m3--conservative-recommendation-engine)
- [confidence-rules.md](https://github.com/sovereignsquad/impact/blob/main/docs/confidence-rules.md) pattern (deterministic ids)

## Problem

Raw inventory alone does not **guide**; users need trustworthy **next experiments** without hype.

## Goal

- Rule set producing: **supported starting use cases**, **cautions**, **recommended next experiments**, **local vs cloud-first hints**.
- Every line **traceable** to profile facts; unit tests for rules.

## Scope

- Engine + wiring into HTML (and optionally JSON) report.
- Documentation of rule ids in `docs/` (short) or inline with [schema-semantics](https://github.com/sovereignsquad/impact/blob/main/docs/schema-semantics-v0.3.md) style discipline.

## Constraints

- No **AI readiness score** marketing; no CRUD/shell benchmark scope; no GUI/DMG ([mlp.md — What not to do](https://github.com/sovereignsquad/impact/blob/main/docs/mlp.md#what-not-to-do-for-mlp)).

## Acceptance Checks

- [ ] Recommendations are **deterministic** (same profile → same output)
- [ ] User/developer can see **why** each recommendation fired (rule id + fact reference)
- [ ] Wording stays **conservative** and **honest**
- [ ] Tests cover happy path + edge cases (unreachable runtime, no models, etc.)

## Dependencies

- **M2** may share layout hooks; can sequence after M2 or parallel with clear merge plan

## Delivery Artifacts

- PR + brief rule catalogue in repo docs or issue comment.
