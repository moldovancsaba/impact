# SSOT map — what is authoritative where

**SSOT** = **Single Source of Truth** (one authoritative place per topic; other docs defer or link here).

**Use this page** when two documents disagree. It does **not** replace the sources below; it **routes** you to the right one.

**Programme hub (workflow SSOT):** [sovereignsquad · impact project](https://github.com/orgs/sovereignsquad/projects/4) · [board view](https://github.com/orgs/sovereignsquad/projects/4/views/1)

**Archive:** personal [Project #2](https://github.com/users/moldovancsaba/projects/2) — historical reference only; **Status** changes happen on the **org project**. Migration notes: [mlp-cto-directive-org-migration-sovereignsquad.md](mlp-cto-directive-org-migration-sovereignsquad.md).

---

## Authority table

| Topic | Authoritative source | In-repo mirror / helper |
| ----- | -------------------- | ------------------------ |
| **Workflow column** (Todo, In Progress, Done, Roadmap, …) | **[Org project 4](https://github.com/orgs/sovereignsquad/projects/4) → Status** on each item | [`scripts/gh-issue-bodies/apply-status.sh`](../scripts/gh-issue-bodies/apply-status.sh); [project-management.md](project-management.md) §3–§6; [current-state.md](current-state.md) § GitHub board |
| **Scope, acceptance, delivery intent** for a ticket | **GitHub issue body** (live on github.com) | [`scripts/gh-issue-bodies/`](../scripts/gh-issue-bodies/) — bulk refresh only; **after push, GitHub wins** |
| **Operational truth** on `main` (MVP, Path B/C, gates, sequencing) | [current-state.md](current-state.md) — **§ Operational status** | If this **contradicts Project Status** on *workflow*, **update this file** to match the Project |
| **Version alignment** (tag, npm, `schema_version`, `impact --version`) | [current-state.md](current-state.md) — **§ Versioning (SSOT)** | [release-checklist.md](release-checklist.md), [npm-publish.md](npm-publish.md) |
| **Product** definition and principles | [product.md](product.md) + [**#1** doctrine](https://github.com/sovereignsquad/impact/issues/1) | — |
| **Phase ladder** 0–4 | [**#16**](https://github.com/sovereignsquad/impact/issues/16) | [product.md](product.md) |
| **MLP programme** (M1–M6, phases, constraints, board hints) | [mlp.md](mlp.md) | [Org project 4](https://github.com/orgs/sovereignsquad/projects/4) for execution **Status** |
| **MLP CTO assessment** (delivered vs blocked, next tasks) | [mlp-status-cto.md](mlp-status-cto.md) | Supplements [mlp.md](mlp.md); **2026-04-03** — dashboard **in repo**; activation = **ops** |
| **Next delivery tranche** (dashboard D1–D5, macOS M1–M4) | [mlp-next-delivery-tranche.md](mlp-next-delivery-tranche.md) | **[#58](https://github.com/sovereignsquad/impact/issues/58)–[#62](https://github.com/sovereignsquad/impact/issues/62)** code in repo; [board closure](mlp-next-delivery-tranche.md#board-closure-dashboard); **#63–#66** macOS |
| **Field `confidence`** | [confidence-rules.md](confidence-rules.md) + `packages/schemas` | — |
| **`status` / `presence` / provenance** (profile JSON) | [schema-semantics-v0.3.md](schema-semantics-v0.3.md) | — |
| **Submission HTTP** to a server | [submission-contract.md](submission-contract.md) | — |
| **Runnable behaviour** (CLI, scanners) | **Code** under `apps/` and `packages/` | User-facing copy in README / install docs **describes** code; **code wins** if they differ |
| **Public web post-deploy QA** | [web-deploy-smoke.md](web-deploy-smoke.md) | [web.md](web.md) for build/deploy; [mlp-status-cto.md](mlp-status-cto.md) for gating (#34, aggregates) |

---

## Conflict resolution (order)

1. **What the binary actually does** → **code** on `main`.
2. **Which board column a card is in** → **Project #2 Status** (not issue title, not static prose in README/handoff).
3. **Whether distribution work is “done”** → **issue closed** + **Done** on Project, plus any evidence comment the issue requires (e.g. **#34** smoke).
4. **Released semver / schema_version** → [current-state.md](current-state.md) § Versioning.

---

## Do not duplicate (drift-prone)

Avoid maintaining **second copies** of:

- Per-issue **delivery state** lists in architect handoffs or README (use **Project #2** + [current-state.md](current-state.md)).
- **“In progress”** laundry lists that age in days (link **Programme (Not Done)** instead).

**Maintainers:** after changing Project Status or scope, update [current-state.md](current-state.md) (operational + board paragraphs), [project-management.md](project-management.md) §6 if rules change, and `apply-status.sh` if you want the script to remain reproducible.
