# IMPACT — current state (living snapshot)

**Purpose:** single in-repo summary of **what exists today** on `main`, aligned with the [sovereignsquad impact project board](https://github.com/orgs/sovereignsquad/projects/4/views/1). **Authority routing:** [ssot-map.md](ssot-map.md). **Issues** = SSOT for **acceptance criteria and intent**; **Project Status** = SSOT for **workflow column** (see § GitHub board). This page reduces onboarding friction.

**Last aligned with repo:** see git history for this file’s commit date.

---

## Operational status (source of truth)

**What is true right now** — install reality, live vs prepared, gating, and sequencing:

- **MVP:** complete
- **Path B (repo-based install):** live and verified
- **Path C (npm install):** **Infrastructure Complete** — `scripts/publish-npm-packages.sh` and `verify-mlp-system.sh` are implemented and verified. Gated only on final `npm publish`.
- **Path D (DMG Distribution):** **Infrastructure Complete** — High-fidelity pipeline and `scripts/macos-sign-notarize.sh` are implemented. Gated only on Developer ID credentials (#65).
- **Immediate gates:** [#34](https://github.com/sovereignsquad/impact/issues/34) — maintainer publish + npm smoke; [#58](https://github.com/sovereignsquad/impact/issues/58) — **dashboard activation** — **same-origin `/api/stats/*` + `VITE_STATS_API_BASE` are live on Vercel**; **real aggregate data** still needs **hosted SQLite ingest**, **`IMPACT_INGEST_UPSTREAM`**, **`IMPACT_SUBMIT_URL`**, volume, and proof — **parallel** where capacity ([mlp-status-cto.md § Leadership view](mlp-status-cto.md#cto-acceptance-leadership-dashboard)).
- **Top operational tasks:** **deploy durable ingest** · **set `IMPACT_INGEST_UPSTREAM` on Vercel** · **`IMPACT_SUBMIT_URL` + seed** · **publish npm** · [web-deploy-smoke.md](web-deploy-smoke.md) (§ **Live stats**). **Product-live community aggregates** = upstream + submissions, not the honest **fallback** JSON ([ingest-server.md](ingest-server.md) § *Vercel stats routes*).
- **MLP in-repo:** partially implemented (deterministic recommendations, richer HTML report, **GDS-backed** public web shell + profile explorer); P0 web/data slice **accepted** per [mlp-status-cto.md](mlp-status-cto.md)
- **MLP public web / stats track:** **[#50](https://github.com/sovereignsquad/impact/issues/50)–[#57](https://github.com/sovereignsquad/impact/issues/57)** (H1–H8) — multi-page shell shipped; **`/data.html`** + **production `VITE_STATS_API_BASE`** + **same-origin `GET /api/stats/*` on Vercel** — **UI and stats path work**; **non-fallback** tables need **`IMPACT_INGEST_UPSTREAM`** + volume  
- **Next delivery tranche:** **[#58](https://github.com/sovereignsquad/impact/issues/58)–[#62](https://github.com/sovereignsquad/impact/issues/62)** — **code in repo**; **Org project:** **#58** **In Progress**, **#59–#62** **Todo** (template from [`apply-status.sh`](../scripts/gh-issue-bodies/apply-status.sh)); **[#63](https://github.com/sovereignsquad/impact/issues/63)–[#66](https://github.com/sovereignsquad/impact/issues/66)** Backlog — [mlp-next-delivery-tranche.md](mlp-next-delivery-tranche.md)
- **Community stats (public):** **partially live** — **public web hits real HTTP 200** on **`/api/stats/*`** (Vercel Functions: honest **fallback** until **`IMPACT_INGEST_UPSTREAM`**); **meaningful crowd aggregates** still **not** until hosted ingest + submissions + thresholds — **repo-complete ≠ product-live** for **real** data ([mlp-status-cto.md](mlp-status-cto.md#cto-acceptance-leadership-dashboard))
- **Next sequence:** **activation** (**#58** + **#34** in parallel) → close **#58–#62** with hosted proof → **#44** Path C primary after **#34** → **#44–#46** evidence → spine per [mlp.md](mlp.md)

**Programme health (CTO snapshot):** **Green** — MVP; **green** — web shell; **green** — **stats API layer on Vercel** (same-origin **`/api/stats/*`**, **`/api/health`**, **`VITE_STATS_API_BASE`** in Production/Preview/Development); **amber** — **real** dashboard data (fallback until **`IMPACT_INGEST_UPSTREAM`**) + **public npm** (**#34**) + **Path D** trust. Board **[#44](https://github.com/sovereignsquad/impact/issues/44)–[#49](https://github.com/sovereignsquad/impact/issues/49)**. Next moves **operational**: [mlp-status-cto.md § Leadership view](mlp-status-cto.md#cto-acceptance-leadership-dashboard).

**Status:** Path **B** verified. Path **C** awaits **#34**. **Dashboard engine** is **in repo**; **public `/api` path** is **live** on production hostnames (**[impact.sovereignsquad.com](https://impact.sovereignsquad.com)** and any other domains on the Vercel project); **closure** of **#58–#62** still needs **hosted ingest**, **upstream env**, **submissions**, and **verification**. **MLP** report/web slices in-repo — [mlp-status-cto.md](mlp-status-cto.md). Programme: [mlp.md](mlp.md).

---

## Versioning (SSOT)

Use this table so **Git tag**, **npm semver**, **profile JSON**, and **CLI `--version`** stay aligned. When any layer bumps, bump the others in the **same release** (see [release-checklist.md](release-checklist.md), [npm-publish.md](npm-publish.md)).

| Layer | Canonical value (today) | Where it lives |
| ----- | ------------------------ | -------------- |
| **Git / GitHub Release tag** | `v0.3.0` | Annotated tag on `main`; release notes |
| **`@impact/*` npm semver** | `0.3.0` | Every `packages/*/package.json` and `apps/cli/package.json`; pinned internal `dependencies` |
| **Profile JSON `schema_version`** | `impact.v0.3` | Zod + emitters: `packages/schemas` (`ImpactProfileSchema`); `run-scan` default; all valid fixtures |
| **`impact --version` (CLI)** | Same as `@impact/cli` **0.3.0** | Read at runtime from `apps/cli/package.json` (not hardcoded) |
| **Public web `@impact/web`** | **0.3.0** (semver with CLI/npm for each release) | `apps/web/package.json`; footer on every static page shows **Web shell** version + profile schema (Vite `define` in `vite.config.ts`) |
| **Changelog** | `[0.3.0]` + `[Unreleased]` | [CHANGELOG.md](../CHANGELOG.md) |

**Terminology for profile fields** (operational `status` vs epistemic `presence`, provenance): [schema-semantics-v0.3.md](schema-semantics-v0.3.md). **Historical** schema generations (`impact.v0.1`, `impact.v0.2`) appear only in [CHANGELOG.md](../CHANGELOG.md) and old programme issues — **do not** use them in new code, fixtures, or user-facing docs.

---

## MVP status — **delivered**

The **I.M.P.A.C.T. discovery scanner MVP** is **complete** as of release **`v0.3.0`** ([GitHub Release](https://github.com/sovereignsquad/impact/releases/tag/v0.3.0); `impact.v0.3` profile schema). Exit criteria met: canonical **Path B** install/run on fresh macOS, **`impact-profile.json`** + **`impact-report.html`**, optional submission suppressed with **`--no-submit`**, docs match the working path, packaging track closed ([#27](https://github.com/sovereignsquad/impact/issues/27)).

**This is not** a shipped **benchmark system** or **“v1” product** in a consumer sense — it is the **first complete product milestone** for **local discovery + trust + export**.

**Honest user-facing scope:** [user-expectations-mvp.md](user-expectations-mvp.md) (local visibility only; no crowd dashboard; no DMG; **Path B** install verified; **Path C** npm install prepared on `main`, publicly live after [#34](https://github.com/sovereignsquad/impact/issues/34)).

---

## Programme framing

| Item | Location |
| ---- | -------- |
| Expanded acronym + north star | [README.md](../README.md), [product.md](product.md), [architect-handoff.md](architect-handoff.md) |
| Doctrine anchor (living) | [Issue #1](https://github.com/sovereignsquad/impact/issues/1) |
| Phase ladder 0–4 | [Issue #16](https://github.com/sovereignsquad/impact/issues/16) |

**IMPACT** = **(I)ndustrial (M)ulti-(P)latform (A)gent (C)onnector (T)est** — sovereign evaluation path for **system + tool + LLM**, toward benchmarks. **v0.x in this repo** is the **privacy-first discovery scanner** only (no capability benchmarks yet).

### Post-MVP (not blockers)

**Path B** remains the **verified** default for users until **Path C** is publicly live on npm (repo implementation is on `main`; gate: [#34](https://github.com/sovereignsquad/impact/issues/34)). A **binary** distribution track may follow. Next phase: **release hardening** (tag discipline, wording, small fixes) then **adoption** vs **benchmark foundation** tracks per [issue #1](https://github.com/sovereignsquad/impact/issues/1).

---

## Shipped technical stack

| Area | Detail |
| ---- | ------ |
| Runtime | **Node.js ≥ 20**, TypeScript, **npm workspaces** |
| CLI | `apps/cli` → `impact scan` (see README) |
| Public web shell | `apps/web` — Vite **React + GDS** MPA (`@gds/theme` + `@gds/core` **2.4.3**): home, install, run/submit, community data, profile explorer ([web.md](web.md), [gds-adapter.md](gds-adapter.md)) |
| Schema | **`impact.v0.3`** — provenance on host fields; runtime **`status`** (operational) + **`presence`** (epistemic) + **capabilities.model_inventory**; tool **presence** + provenanced version; model **`presence`** + probe metadata ([`packages/schemas`](https://github.com/sovereignsquad/impact/tree/main/packages/schemas)); see [schema-semantics-v0.3.md](schema-semantics-v0.3.md) |
| Host | `packages/scanner-host` — OS/memory/CPU string, `df` disk, Metal **hint**, salted fingerprint |
| Runtimes | `packages/scanner-runtimes` — Ollama binary + API reachability; **MLX pip only**, explicit **partial** + **no model inventory** |
| Tools | `packages/scanner-tools` — **allowlist** only, PATH + version probes |
| Models | `packages/scanner-models` — Ollama `/api/tags` when reachable; MLX list **empty** until path policy |
| Privacy | `packages/privacy` — `~/.impact/salt`, denylist constants, privacy block |
| Reporting | `packages/reporting` — `impact-profile.json`, `impact-report.html` (provenance, confidence legend, at-a-glance / interpretation / suggested steps / limitations, diagnostics, MLX warning, not-collected, platform footer + support-matrix link); deterministic `buildRecommendations` (shared with web explorer) |
| Submission | `packages/submission` — opt-in POST; **`IMPACT_SUBMIT_URL`** required; 15s timeout + bounded retries; `impact-submission-preview.json` / `impact-submission-receipt.json` + `~/.impact/submission-receipts.log` |
| Orchestration | `packages/core` — `runScan`, merge, coarse **readiness** (not benchmarks) |

---

## Documentation map

| Document | Role |
| -------- | ---- |
| [README.md](../README.md) | **Public front door** — value, quick start, trust, scope |
| [docs/README.md](README.md) | **Curated doc index** |
| *(this file, § Versioning)* | **SSOT** — tag vs npm vs `schema_version` vs `impact --version` |
| [install-macos.md](install-macos.md) | **macOS install** — Path C + Path B |
| [mlp.md](mlp.md) | **Post-MVP programme** — M1–M6, loveability vs benchmarks |
| [mlp-status-cto.md](mlp-status-cto.md) | **MLP CTO assessment** — delivered vs blocked, next developer tasks |
| [web.md](web.md) | **Public marketing shell** (`apps/web`) — multi-page site, deploy smoke: [web-deploy-smoke.md](web-deploy-smoke.md) |
| [mlp-execution.md](mlp-execution.md) | **MLP CTO task list** — execution order and formal completion |
| [mlp-next-delivery-tranche.md](mlp-next-delivery-tranche.md) | **Next tranche** — dashboard **#58–#62**, macOS **#63–#66** |
| [privacy-for-users.md](privacy-for-users.md) | Plain-language **privacy & trust** |
| [user-expectations-mvp.md](user-expectations-mvp.md) | **MVP scope** — local vs crowd, Path B vs DMG |
| [privacy-policy.md](privacy-policy.md) | Formal **privacy policy** |
| [release-checklist.md](release-checklist.md) | Version bump → CI gates → tag → smoke |
| [smoke-test-macos.md](smoke-test-macos.md) | Fresh-machine proof for releases |
| [docs-alignment-after-packaging.md](docs-alignment-after-packaging.md) | **Post-packaging** README/install reconciliation (D6) |
| [CONTRIBUTING.md](../CONTRIBUTING.md) | Build, lint, tests, fixtures |
| [product.md](product.md) | Product + v0.x scope |
| [architecture.md](architecture.md) | Module layout, data flow |
| [architect-handoff.md](architect-handoff.md) | Architect onboarding |
| [submission-contract.md](submission-contract.md) | HTTP ingest (normative) |
| [project-management.md](project-management.md) | **org project 4** column semantics; contributor workflow |
| [ssot-map.md](ssot-map.md) | **Which doc/issue wins** when content conflicts |
| [CHANGELOG.md](../CHANGELOG.md) | Release-oriented history |
| [fixtures/baseline-profile.sample.json](../fixtures/baseline-profile.sample.json) | Valid **v0.3** example |
| [fixtures/scenarios/](../fixtures/scenarios/) | Scenario JSON for validation |
| [fixtures/invalid/](../fixtures/invalid/) | Negative cases — must fail `validateImpactProfile` |
| [confidence-rules.md](confidence-rules.md) | Field confidence SSOT |
| [schema-semantics-v0.3.md](schema-semantics-v0.3.md) | Terminology |
| [support-matrix.md](support-matrix.md) | OS behaviour |

---

## Automation & quality gates

| Mechanism | Location |
| --------- | -------- |
| **CI** | [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) — `npm ci`, **lint**, **build**, **test**, **validate-fixtures**, **validate-invalid-fixtures** |
| **Lint** | [`eslint.config.mjs`](../eslint.config.mjs) |
| **Fixture validation** | `npm run validate-fixtures` (recursive under `fixtures/`, skips `invalid/`) + `npm run validate-invalid-fixtures` |
| **Board refresh (local)** | [`scripts/gh-issue-bodies/apply-status.sh`](../scripts/gh-issue-bodies/apply-status.sh) |

---

## GitHub board ↔ this snapshot

**Programme workflow SSOT:** [org project](https://github.com/orgs/sovereignsquad/projects/4) **Status** field (not issue titles). This file and [`apply-status.sh`](../scripts/gh-issue-bodies/apply-status.sh) are **convenience mirrors**; if anything disagrees, **the Project wins** — then update docs/script.

**MVP and Path B packaging (#27)** are **Done**; **Path C npm publish (#34)** is the usual **immediate** gate (**In Progress**) until closed. **#10** / **#14** are **Done** for shipped MVP scope. **#4** / **#5**, **#38** (binary), and theme cards vary by priority — see the [Programme (Not Done) view](https://github.com/orgs/sovereignsquad/projects/4/views/1).

Maintainer rules: [project-management.md](project-management.md) §6 (snapshot) and §3 (column semantics).

---

## Explicit non-goals (still)

No capability benchmarks, agent CRUD tests, shell execution benchmarks, crowd scores, auto-repair, background telemetry, or “AI readiness scores” as product truth — see architect guidance in issues and [product.md](product.md).

---

## Programme next slices (post-MVP)

Sequencing is **not** authoritative here — use **Operational status** for the **#34** gate. **MLP epics and phases:** [mlp.md](mlp.md) (M1–M6, priorities, what not to ship).

Typical forward work:

1. **[#34](https://github.com/sovereignsquad/impact/issues/34)** — publish `@impact/*` to npm; published-package smoke; evidence on the issue.  
2. **MLP spine (P0)** — [#44](https://github.com/sovereignsquad/impact/issues/44) M1 · [#45](https://github.com/sovereignsquad/impact/issues/45) M2 · [#46](https://github.com/sovereignsquad/impact/issues/46) M3 ([mlp.md](mlp.md); **Todo** on org project 4).  
3. **MLP follow-ons (P1)** — [#47](https://github.com/sovereignsquad/impact/issues/47)–[#49](https://github.com/sovereignsquad/impact/issues/49) M4–M6 ([mlp.md](mlp.md); **Backlog**).  
4. **#4 / #5** — community and security channels when scheduled.  
5. **Long horizon** — benchmark portal, binary packaging, platform parity; **not** the MLP spine ([mlp.md](mlp.md) § Board placement).

**Delivered slices (reference):** Sprint B **[#17](https://github.com/sovereignsquad/impact/issues/17)–[#26](https://github.com/sovereignsquad/impact/issues/26)** (including **`impact.v0.3`** semantics); **[#27](https://github.com/sovereignsquad/impact/issues/27)** Path B smoke; **[#28](https://github.com/sovereignsquad/impact/issues/28)** submission 409 duplicate path. Issue bodies: [`scripts/gh-issue-bodies/`](../scripts/gh-issue-bodies/). Install: [install-macos.md](install-macos.md).
