## Objective

Align the **optional submission client** with the **normative HTTP contract**: timeouts, bounded retries, structured **local receipts**, and **no silent failure**—without ever sending data without explicit user consent.

## Unified Context

Submission is **opt-in** and **privacy-sensitive**. The contract (`docs/submission-contract.md`) is useless if the client relies on infinite platform defaults or hides errors. Bounded behaviour makes behaviour **supportable** and **auditable** in enterprise settings.

Failure modes without implementation:

- hung `fetch` on bad networks
- infinite retries hammering ingest
- users cannot prove what was sent (no preview/receipt trail)

## Based On

- Sprint B — B5
- [docs/submission-contract.md](https://github.com/sovereignsquad/impact/blob/main/docs/submission-contract.md)
- [docs/privacy-policy.md](https://github.com/sovereignsquad/impact/blob/main/docs/privacy-policy.md)
- `packages/submission` — `submitProfile`, receipt writers
- [docs/schema-semantics-v0.3.md](https://github.com/sovereignsquad/impact/blob/main/docs/schema-semantics-v0.3.md)
- [docs/confidence-rules.md](https://github.com/sovereignsquad/impact/blob/main/docs/confidence-rules.md)
- [docs/support-matrix.md](https://github.com/sovereignsquad/impact/blob/main/docs/support-matrix.md)

## Problem

Documented timeout/retry semantics trailed implementation; trust gap for CTO acceptance.

## Goal

- Per-attempt timeout (default **15s**)
- ≤**3** attempts with backoff for retryable classes
- Non-retry on **400** / **401** / **403**
- **`impact-submission-receipt.json`** + `~/.impact/submission-receipts.log`
- Vitest with mocked `fetch` for success, 5xx retry, 400 no retry

## Scope

In scope: `@doneisbetter/submission`, CLI wiring after consent, tests.

Out of scope: server implementation; OAuth; binary signing.

## Execution Prompt

Implement `submit-profile.ts` with `AbortController` timeout; backoff table; parse success ids; extend `SubmissionResult`; ensure CLI writes receipt after attempt sequence completes.

## Scope / Non-Goals

Non-goals: background sync; telemetry.

## Constraints

- No submission without **`IMPACT_SUBMIT_URL`** + CLI consent flow
- Local **`impact-profile.json`** never deleted on failure

## Acceptance Checks

- [ ] Success path tested
- [ ] Timeout / network error retry path tested
- [ ] 400 does not retry
- [ ] Malformed JSON success body handled gracefully
- [ ] Contract doc matches code

## Dependencies

- **Related:** #13 (umbrella submission + server), #22 (preview file), #28 (409 duplicate path)

## Out of Scope

- Ingest server code in this repo

## Risks

- Flaky tests — mock `fetch`; keep sleeps minimal in vitest

## Delivery Artifact

- `submit-profile.ts` + tests
- Receipt schema type exported

## Developer Notes

- Style reference: [mvp-factory-control#498](https://github.com/moldovancsaba/mvp-factory-control/issues/498)
