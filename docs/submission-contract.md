# Submission contract — IMPACT profile ingest (v0.x)

**Status:** normative for client behaviour in this repository. Server implementations should match this document or explicitly version-diverge.

**Related:** [privacy-policy.md](privacy-policy.md), `packages/submission`, [ingest-server.md](ingest-server.md) (reference **D1** server), issue [#13](https://github.com/sovereignsquad/impact/issues/13).

---

## Purpose

Define how the **optional** anonymous profile submission works over HTTP when `IMPACT_SUBMIT_URL` is set and the user has **explicitly consented** in the CLI.

---

## Request

| Aspect | Rule |
| ------ | ---- |
| Method | `POST` |
| URL | Value of `IMPACT_SUBMIT_URL` (HTTPS recommended in production) |
| Headers | `Content-Type: application/json` |
| Body | **Exactly** one JSON document, one of: **(A)** legacy — an `ImpactProfile` validating **`impact.v0.3`**; **(B)** MLP envelope — **`submission_kind`: `"impact.submission.v0.1"`** plus **`profile`** (same schema) and **`dashboard_summary`** (`impact.summary.v0.1`). See **@doneisbetter/schemas** `parseSubmissionBody`. |

**MLP envelope (recommended for new clients):**

```json
{
  "submission_kind": "impact.submission.v0.1",
  "profile": { "schema_version": "impact.v0.3", "...": "..." },
  "dashboard_summary": { "summary_version": "impact.summary.v0.1", "...": "..." }
}
```

Servers **persist** canonical **`profile`** JSON and optional **`dashboard_summary`** JSON separately; **dedupe** uses the **full raw HTTP body** SHA-256 and **`run_id`** as today. **Aggregation** may prefer **`dashboard_summary`** when present ([mlp-cto-directive-mlp-summary-payload.md](mlp-cto-directive-mlp-summary-payload.md)).

### No-PII guarantee on the wire

The body **must** conform to the published schema and privacy rules:

- No raw hardware serial numbers or vendor UUIDs  
- No usernames, hostnames, or file contents  
- Fingerprint is **salted coarse hash** only, as emitted by the scanner  

Servers **must not** log full payloads at info level in shared systems without policy; clients **must not** add fields outside the schema without a schema bump.

---

## Response

| HTTP status | Meaning | Client behaviour |
| ----------- | ------- | ---------------- |
| `2xx` | Accepted | Parse body if JSON; extract id (below). Treat as success. |
| `400` | Bad payload | Do not retry without user intervention; local files unchanged. |
| `401` / `403` | Auth / forbidden | No retry unless credentials are added (out of scope for default client). |
| `409` | Conflict / duplicate | **No retry.** Client treats as **terminal success with `duplicate: true`** when a `submission_id` can be parsed (or synthesises `duplicate_<run_id>`). See **Duplicate handling**. |
| `429` | Rate limited | Retry with backoff (below). |
| `5xx` | Server error | Retry with backoff; local files unchanged. |

### Response body (recommended JSON)

```json
{
  "submission_id": "string",
  "received_at": "2026-04-03T12:00:00.000Z"
}
```

- **`submission_id`** (required): opaque string, stable for idempotency references.  
- **`id`** may be accepted as an alias for `submission_id` for compatibility.  
- If body is not JSON, client may synthesise `submission_id` from timestamp (current behaviour) — servers should prefer returning JSON.

---

## Client timeout policy

| Phase | Default |
| ----- | ------- |
| Per HTTP attempt | **15s** total (`AbortController` timeout around `fetch` in `packages/submission`). |

Configurable via `submitProfile(profile, { timeoutMs })` for tests or constrained networks.

---

## Retry semantics

| Condition | Action |
| --------- | ------ |
| Network error, `408`, `429`, `5xx` | At most **3** attempts with backoff **0.5s, 2s, 8s** between attempts (implemented in `submitProfile`). |
| `400` / `401` / `403` | No retry. |
| `409` | No retry — duplicate handling path (below). |
| Success (`2xx` or duplicate success path) | Stop; write structured receipt + append log line (see below). |

---

## Duplicate handling

- Servers **may** deduplicate by `run_id` or content hash. On duplicate they **should** return **`409 Conflict`** with a JSON body that includes **`submission_id`** (or **`id`**) referring to the **existing** ingest the server considers authoritative.
- **Client behaviour (`submitProfile`):**
  - Does **not** retry on `409`.
  - Returns **`ok: true`**, **`duplicate: true`**, and **`submission_id`** from the body when JSON parses; otherwise **`submission_id`** defaults to `duplicate_<run_id>` for local audit.
  - **Local `impact-profile.json` / HTML report / `impact-submission-preview.json` are never modified** by submission.
  - **`impact-submission-receipt.json`** uses **`outcome: "duplicate"`** and **`duplicate: true`** so the trail is explicit.
- If a server returns `409` with an empty body, the client still completes the duplicate path with a synthetic id; operators should prefer returning JSON with the prior `submission_id`.

---

## Local artefacts (audit)

| File | When |
| ---- | ---- |
| `impact-submission-preview.json` | After consent, **before** POST — exact JSON that will be sent (legacy: profile only; MLP: **envelope** with **`dashboard_summary`**). |
| `impact-submission-receipt.json` | After the HTTP attempt sequence completes (success or final failure) — timestamp, endpoint, `payload_sha256`, `preview_payload_sha256` (same hash when preview unchanged), outcome, attempts, optional `submission_id` / error / `last_status`. |
| `~/.impact/submission-receipts.log` | Append-only one-line audit (legacy-friendly). |

Receipts are **local audit**, not telemetry.

---

## Versioning

- **`schema_version`** inside the profile (`impact.v0.3` today) is independent of this HTTP contract revision.  
- **`impact.summary.v0.1`** and **`normalization_version`** (optional inside summary) track client-side bucketing rules.  
- **`submission_kind`** distinguishes legacy body vs **`impact.submission.v0.1`** envelope.  
- Breaking HTTP changes should bump a `X-Impact-Contract-Version` header **or** a path version — not yet required for v0.x.

---

## Acceptance

Normative contract for optional submission. Client timeout, bounded retry, and structured receipt files are implemented in `packages/submission` and wired from the CLI after explicit consent.
