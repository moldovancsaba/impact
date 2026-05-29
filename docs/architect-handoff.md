# Architect handoff — IMPACT programme state

**Audience:** system / software architects onboarding to **IMPACT**  
**Date context:** 2026-04-03  
**Where truth lives:** [ssot-map.md](ssot-map.md) — **issues** (scope/acceptance), **[org project 4](https://github.com/orgs/sovereignsquad/projects/4) Status** (workflow), **current-state** (operational snapshot), **code** (behaviour).  
**Style reference for issue quality:** [mvp-factory-control#495](https://github.com/moldovancsaba/mvp-factory-control/issues/495)

**Living snapshot of the repo + board mapping:** [current-state.md](current-state.md). For **operational truth now** (Path B vs Path C, the [#34](https://github.com/sovereignsquad/impact/issues/34) publish gate, and post-gate sequencing), use the opening **Operational status** section there — not this handoff doc. For **version alignment** (Git tag `v0.3.0`, npm `0.3.0`, JSON `impact.v0.3`, `impact --version`), use **§ Versioning (SSOT)** in that same file.

**Post-MVP product track (loveability, not benchmarks):** [mlp.md](mlp.md) — M1–M6, constraints, board placement hints.

---

## 1. What IMPACT is (north star)

**IMPACT** expands to **(I)ndustrial (M)ulti-(P)latform (A)gent (C)onnector (T)est**.

It is a programme for a **fully sovereign** evaluation stack spanning **system + tool + LLM**, aimed at **industrial-grade** rigour and **global** usefulness. The long-term destination is a **benchmark system** with clear phases (discovery → readiness hints → atomic probes → capability benchmarks), not a single throwaway script.

**v0.x today** delivers the **discovery layer**: a **privacy-first local CLI** that inventories host signals, runtimes (e.g. Ollama, MLX pip), **allowlisted** AI tools on `PATH`, and models exposed via supported local APIs. It emits **canonical JSON** (`impact.v0.3`) and an **offline HTML report**, with **opt-in** anonymous submission gated by explicit consent and `IMPACT_SUBMIT_URL`.

This positions later benchmark phases on **ground truth** about what can run where, under **explicit privacy rules**.

---

## 2. Repository and runtime shape

| Area | Implementation |
| ---- | ---------------- |
| Language / runtime | TypeScript on **Node.js ≥ 20** |
| Packaging | **npm workspaces** monorepo |
| Entry | `apps/cli` → `impact` binary after `npm run build` |
| Validation | `@doneisbetter/schemas` — **Zod** `ImpactProfileSchema` (`impact.v0.3`) |
| Orchestration | `@doneisbetter/core` — `runScan()`, merge, optional readiness |
| Host | `@doneisbetter/scanner-host` — OS, CPU string, memory, `df` disk, Metal hint, salted fingerprint |
| Runtimes | `@doneisbetter/scanner-runtimes` — Ollama version + localhost reachability; MLX via pip |
| Tools | `@doneisbetter/scanner-tools` — **allowlist only** |
| Models | `@doneisbetter/scanner-models` — Ollama `/api/tags`; MLX dirs **stub** |
| Privacy | `@doneisbetter/privacy` — `~/.impact/salt`, denylist constants |
| Reporting | `@doneisbetter/reporting` — `impact-profile.json`, `impact-report.html` |
| Submission | `@doneisbetter/submission` — HTTP POST client + local receipt log |

**Build order** is scripted in root `package.json` (`npm run build`) to respect internal dependencies.

**Tests today:** Vitest in `@doneisbetter/schemas`, `@doneisbetter/core`, `@doneisbetter/reporting`, `@doneisbetter/submission`. **CI:** [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) (`verify:release`-style gates on PRs).

---

## 3. Trust, privacy, and data boundaries

- **Local-first scan** — no network required for detection (except optional localhost runtime APIs).
- **No** serial numbers, hardware UUIDs, usernames, hostnames as identifiers, file contents, or env secrets in the profile contract.
- **Fingerprint** = SHA-256 of **canonical coarse host fields + local salt** (not a stable hardware ID).
- **Submission** requires interactive consent + preview; without `IMPACT_SUBMIT_URL` the client **refuses** to send.

Authoritative narrative: [privacy-policy.md](privacy-policy.md). User-oriented summary: [privacy-for-users.md](privacy-for-users.md).

---

## 4. Programme phases (index)

| Phase | Intent |
| ----- | ------ |
| 0 | Foundation — monorepo, schema, contracts, fixtures |
| 1 | MVP discovery — scanners, reports, consent |
| 2 | Readiness hints — coarse rules, **no** benchmark scores |
| 3 | Atomic benchmark foundation |
| 4 | Capability benchmarks |

Indexed in issue **#16**; doctrine in issue **#1**.

---

## 5. GitHub — how to work it

- **Issues** hold **Objective, Context, Problem, Goal, Scope, Execution Prompt, Acceptance Checks, Dependencies, Risks, Delivery Artifacts** (aligned with [#495](https://github.com/moldovancsaba/mvp-factory-control/issues/495)).
- **Kanban state** uses **only** [org project 4](https://github.com/orgs/sovereignsquad/projects/4) **Status** (`IDEABANK (SOMEDAY)` → … → `Done`). **Titles do not** carry `Roadmap:`, `Backlog:`, `Todo:`, or open/closed state.
- **Priority** may appear as **P0 / P1** labels and/or in titles as programme priority (not board column).
- Bodies under `scripts/gh-issue-bodies/` are a **reproducible mirror** for bulk edits; **GitHub remains authoritative** after push.

---

## 6. Delivered vs in-flight

**Do not use this handout for a per-issue delivery list** — it goes stale within days.

- **What is true on `main` now** (MVP, Path B/C, **#34** gate): [current-state.md](current-state.md) — **§ Operational status**.
- **Which column each card is in:** [org project 4](https://github.com/orgs/sovereignsquad/projects/4/views/1) — use filtered views (e.g. **Programme (Not Done)**) when configured.
- **Authority when sources conflict:** [ssot-map.md](ssot-map.md).

---

## 7. Known technical gaps (architect-relevant)

- **Windows** parity for disk and shell probes is not fully validated.
- **Submission** server contract: [submission-contract.md](submission-contract.md) (normative); further client/server hardening may still be tracked in issues.
- **Benchmark** layers are **out of scope** until phases 3–4; guardrails in product docs and issues must stay enforced.

---

## 8. Quick verify

```bash
git clone https://github.com/sovereignsquad/impact.git
cd impact
npm ci
npm run build
npm test
npm run impact -- scan --no-submit -o ./reports
```

---

## 9. Primary references

- [ssot-map.md](ssot-map.md), [current-state.md](current-state.md), [org project 4](https://github.com/orgs/sovereignsquad/projects/4/views/1)
- [#1](https://github.com/sovereignsquad/impact/issues/1) (doctrine), [#16](https://github.com/sovereignsquad/impact/issues/16) (phases)
- [product.md](product.md), [architecture.md](architecture.md), [privacy-policy.md](privacy-policy.md)
- Issue template quality bar: [mvp-factory-control#495](https://github.com/moldovancsaba/mvp-factory-control/issues/495)
