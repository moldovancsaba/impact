# I.M.P.A.C.T. — architecture

**IMPACT** (**I**ndustrial **M**ulti-**P**latform **A**gent **C**onnector **T**est) is implemented here as a **TypeScript / Node.js** monorepo. The **v0.x** slice is a local discovery scanner; later phases add benchmarks per [docs/product.md](product.md). A single **orchestrator** in `@doneisbetter/core` runs modular scanners, merges a typed profile, validates it against `@doneisbetter/schemas`, then `@doneisbetter/reporting` and `@doneisbetter/submission` handle exports and optional upload.

## Repository layout

```text
apps/cli                 CLI entry (`impact` command)
apps/web                 Public multi-page Vite site
apps/ingest              Optional HTTP ingest server (D1 — validate, dedupe, SQLite)
packages/core            Scan orchestration, merge, readiness hints
packages/schemas         Zod schema + types (`impact.v0.3`, provenance, confidence rules)
packages/scanner-host    OS / hardware coarse signals
packages/scanner-runtimes Ollama, MLX (pip), …
packages/scanner-tools   Curated PATH allowlist
packages/scanner-models  Models via runtime APIs (e.g. Ollama tags)
packages/privacy         Salt file, privacy block, denylist constants
packages/reporting       `impact-profile.json`, `impact-report.html`
packages/submission      Opt-in POST client, local receipt log
docs/                    [README](README.md) index, product, privacy, this file
fixtures/                Sample validated JSON profiles
scripts/                 Automation placeholders
```

## Data flow

```mermaid
flowchart LR
  CLI[apps/cli]
  CORE[@doneisbetter/core]
  H[scanner-host]
  R[scanner-runtimes]
  T[scanner-tools]
  M[scanner-models]
  P[@doneisbetter/privacy]
  S[@doneisbetter/schemas]
  REP[@doneisbetter/reporting]
  SUB[@doneisbetter/submission]

  CLI --> CORE
  CORE --> H
  CORE --> R
  CORE --> T
  CORE --> M
  CORE --> P
  CORE --> S
  CLI --> REP
  CLI --> SUB
  CORE --> REP
```

1. **Load/create salt** (`~/.impact/salt`) via `@doneisbetter/privacy`.  
2. **Parallel scans:** host, runtimes, tools.  
3. **Model enumeration** depends on runtime signals (e.g. Ollama reachability).  
4. **Merge + validate** → `ImpactProfile` (`impact.v0.3`).  
5. **Optional** coarse readiness string (conservative, not a benchmark).  
6. **Write** JSON + HTML; **optional** guided submission.

## Scanner contract

Scanners are plain modules exporting async functions that return structured slices. They **must not throw** for benign failures (timeouts, missing binaries); they return empty or partial data with `confidence: "unknown"` where appropriate.

## Privacy boundaries

- No raw hardware UUIDs or serials.  
- Fingerprint = **SHA-256** of canonical JSON of coarse host fields + **local salt**.  
- Submission requires **explicit** CLI confirmation; endpoint from `IMPACT_SUBMIT_URL`.

## Extension points

- **New runtime:** add `scanner-runtimes` detector + `scanner-models` enumerator.  
- **New tool:** extend `TOOL_ALLOWLIST` in `scanner-tools` (curated only).  
- **Schema bump:** new `schema_version` literal (e.g. `impact.v0.4`), new Zod types in `packages/schemas`, migrate emitters + fixtures + docs; keep [schema-semantics-v0.3.md](schema-semantics-v0.3.md) pattern for the active generation.

## Build & run

```bash
npm ci
npm run build
npm run impact -- scan --no-submit -o ./reports
```

See [product.md](product.md) for MVP scope and [privacy-policy.md](privacy-policy.md) for collection boundaries.
