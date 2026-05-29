# MLP execution plan (CTO) — tasks and order

**Purpose:** actionable checklist for the **first MLP execution cycle**, after programme definition in [mlp.md](mlp.md). **Board / issues:** [org project 4](https://github.com/orgs/sovereignsquad/projects/4/views/1); spine **[#44](https://github.com/sovereignsquad/impact/issues/44)–[#49](https://github.com/sovereignsquad/impact/issues/49)**.

**Next delivery tranche (dashboard + macOS packaging):** [mlp-next-delivery-tranche.md](mlp-next-delivery-tranche.md) — issues **[#58](https://github.com/sovereignsquad/impact/issues/58)–[#66](https://github.com/sovereignsquad/impact/issues/66)**.

**CTO snapshot (delivered vs blocked):** [mlp-status-cto.md](mlp-status-cto.md).

**Rules:**

- Do **not** treat **MLP as fully live for the public** until **[#34](https://github.com/sovereignsquad/impact/issues/34)** is **operationally closed** (publish, `npm view`, published-package smoke, evidence on the issue, **Done** on the board). **Path C** must be real before “default npm install” is honest for strangers.
- **In-repo MLP work** may proceed in parallel; several slices (**M2/M3/W2**-class) are already merged — see [mlp-status-cto.md](mlp-status-cto.md). This checklist still defines **formal completion** and **order** for board evidence.

---

## Threshold already achieved (not “tasks”)

- MVP shipped  
- MLP defined in [mlp.md](mlp.md)  
- MLP issues on the board (**#44–#49**)  
- Public web shell live ([docs/web.md](web.md))  
- Vercel deployment working ([vercel.json](../vercel.json))  
- Partial MLP implementation in code (recommendations, report UX, web profile explorer) — [mlp-status-cto.md](mlp-status-cto.md)  

**What is not done:** Gate **#34** (public npm) and full **evidence-backed closure** of the execution items below.

---

## Gate 0 — Public install (**#34**)

| ID | Deliverable | Acceptance |
| --- | ----------- | ---------- |
| **T0.1** | Publish `@doneisbetter/cli`; `npm view @doneisbetter/cli`; published-package smoke; evidence on **#34**; **#34** → **Done** | Path C is **real** (registry), smoke uses **published** package not workspace-only install; README/install can promote Path C as primary |

---

## M1 — Public install and adoption (**#44**)

| ID | Priority | Deliverable | Acceptance |
| --- | --- | --- | --- |
| **T1.1** | P0 | Path C **default** everywhere: [README.md](../README.md), [install-macos.md](install-macos.md), [current-state.md](current-state.md), [apps/web](../apps/web/), [web.md](web.md) | No doc presents Path B as **primary**; web install matches **live** npm; smoke docs use public install |
| **T1.2** | P0 | Troubleshooting: Node version, npm global/perms, `command not found`, failed build / missing outputs | Normal technical user can recover without reading repo internals |
| **T1.3** | P1 | Document repeatable smoke: install from npm → scan → outputs → no unintended submission | — |

*(T1.2 also aligns with **#49** / M6.)*

---

## M2 — Report delight (**#45**)

| ID | Priority | Deliverable | Acceptance |
| --- | --- | --- | --- |
| **T2.1** | P0 | Top of `impact-report.html`: machine overview, runtime summary, model/tool highlights, plain-language interpretation | User understands result **before** tables |
| **T2.2** | P0 | **“What this means”** — inventory → meaning (experimentation, unreachable runtime, partial support, cloud-first for heavy flows) | No hype, no fake score; grounded in facts |
| **T2.3** | P0 | **“Next best action”** — 1–3 concrete steps (e.g. start Ollama, try small model, review npm docs) | Specific, conservative, useful |
| **T2.4** | P1 | **“Known limitations”** — not collected, partial, unknown; no community stats yet | — |

---

## M3 — Conservative recommendation engine (**#46**)

| ID | Priority | Deliverable | Acceptance |
| --- | --- | --- | --- |
| **T3.1** | P0 | Deterministic rules module → recommendations (e.g. 7B/8B starting point, lightweight local OK, unreachable runtime, cloud-first for agentic) | Deterministic, explainable, testable; **no** opaque scoring |
| **T3.2** | P0 | Each recommendation cites **evidence** (memory, runtime status, inventory, platform) | User sees **why** |
| **T3.3** | P0 | Fixture tests: low memory, Ollama reachable/unreachable, MLX partial, no runtimes, mixed states | — |

---

## M4 — Shareable layer (**#47**) — after M1–M3 underway

| ID | Priority | Deliverable |
| --- | --- | --- |
| **T4.1** | P1 | Share-safe summary card (machine class, key status, short interpretation, no sensitive IDs) |
| **T4.2** | P1 | Copy/export flow; same wording in report + web shell |

---

## M5 — Community visibility (**#48**)

| ID | Priority | Deliverable |
| --- | --- | --- |
| **T5.1** | P1 | Ingest MVP architecture: path, storage, validation, duplicates, privacy thresholds |
| **T5.2** | P1 | First aggregates: avg/median memory, top chip/runtime/tool/model family, platform share |
| **T5.3** | P1 | Stats page in web shell **only** when ingestion exists (replace placeholder) |

---

## M6 — Install polish (**#49**) — post-#34

| ID | Priority | Deliverable |
| --- | --- | --- |
| **T6.1** | P1 | One story: README, install docs, web shell, smoke docs |
| **T6.2** | P1 | Web shell troubleshooting page for common failures |

---

## Web shell — spine tasks (`apps/web`)

| ID | Priority | Deliverable |
| --- | --- | --- |
| **W1** | P0 | Sharpen hero; precise install truth; product truth; community stats clearly **planned** until live |
| **W2** | P0 | Dropped `impact-profile.json`: system summary, runtimes/tools/models, status/presence/confidence, simplified interpretation (**no upload**) |
| **W3** | P1 | Built-in redacted sample profile (“try without scanning”) |
| **W4** | P1 | Results explainer page: sections, reachable/partial/unknown, what to do next |

---

## Public web & historical data — **[#50](https://github.com/sovereignsquad/impact/issues/50)–[#57](https://github.com/sovereignsquad/impact/issues/57)** (H1–H8)

**SSOT for intent and board mapping:** [mlp-status-cto.md](mlp-status-cto.md). **Do not** fake community aggregates; placeholders must be **labelled**.

| Task | Issue | Board (template) | Deliverable |
| ---- | ----- | ---------------- | ----------- |
| **H1** | [#50](https://github.com/sovereignsquad/impact/issues/50) | Todo | IA: **hardware / tools / LLMs** sections (structure + honest empty states) |
| **H5** | [#54](https://github.com/sovereignsquad/impact/issues/54) | Todo | **Install / download** page — primary CTA; Path B truth until **#34**; npm after publish |
| **H6** | [#55](https://github.com/sovereignsquad/impact/issues/55) | Todo | **Launch / use** — install → scan → report → outputs |
| **H7** | [#56](https://github.com/sovereignsquad/impact/issues/56) | Todo | **Submit** — optional, privacy, preview/receipt, how stats update later |
| **H8** | [#57](https://github.com/sovereignsquad/impact/issues/57) | Todo | **Homepage** — download, how it works, historical data, submit |
| **H2** | [#51](https://github.com/sovereignsquad/impact/issues/51) | Backlog | Historical **hardware** aggregates MVP (when ingest feeds data) |
| **H3** | [#52](https://github.com/sovereignsquad/impact/issues/52) | Backlog | Historical **tools/runtimes** aggregates MVP |
| **H4** | [#53](https://github.com/sovereignsquad/impact/issues/53) | Backlog | Historical **LLM/model** aggregates MVP |

---

## Recommended order

1. **Dashboard activation (ops)** — **[#58](https://github.com/sovereignsquad/impact/issues/58)** sprint: hosted ingest → live **`/api/stats/*`** → **`VITE_STATS_API_BASE`** web build → seed/smoke → close **#58–#62** with proof ([mlp-next-delivery-tranche.md](mlp-next-delivery-tranche.md#board-closure-dashboard), [web-deploy-smoke.md](web-deploy-smoke.md) § *Live stats*). **Code is already in repo** — execute, don’t replan.  
2. **Parallel where capacity:** **[#34](https://github.com/sovereignsquad/impact/issues/34)** — npm publish six-step maintainer path (issue body).  
3. **Deploy + smoke** public web shell — [web-deploy-smoke.md](web-deploy-smoke.md) (always; includes **live stats** checks when wired).  
4. **After #34:** **#44** (M1) — Path C **primary** on site; **#45–#46** evidence as appropriate.  
5. **macOS distribution / trust** — **[#63](https://github.com/sovereignsquad/impact/issues/63)–[#66](https://github.com/sovereignsquad/impact/issues/66)**; **M3** gates **public-quality** Mac delivery. Does **not** block ingest/stats activation.  
6. **#47**, **#49**, **[#48](https://github.com/sovereignsquad/impact/issues/48)** (umbrella; align with **#58–#62**).  
7. **#51–#53** — legacy board rows; keep **Backlog** or close when **#58–#62** absorb scope.  

---

## Constraints (whole cycle)

- No benchmark **scoring**  
- No CRUD / shell benchmark scope  
- **No GUI** — Path D DMG is **CLI-in-.app** only; **not** “finished Mac product” until **M3**  
- No **leaderboards**  
- No hype-driven claims  

---

## Developer message (CTO)

**Public web / data P0** is **accepted** in-repo. **Dashboard backend (#58–#62)** is **implemented in repo** — bottleneck = **activation** (hosted ingest, live API, **`VITE_STATS_API_BASE`**, volume, verification), **not** more engine design. **Leadership SSOT:** [mlp-status-cto.md § Leadership view](mlp-status-cto.md#cto-acceptance-leadership-dashboard) — **repo-complete ≠ product-live**.

**Top operational tasks:** **[#58](https://github.com/sovereignsquad/impact/issues/58)** activation sprint · **[#34](https://github.com/sovereignsquad/impact/issues/34)** npm path · [web-deploy-smoke.md](web-deploy-smoke.md) (add **§ Live stats** when wired).

**Then:** **#44** Path C primary + **#44–#46** evidence after **#34** · DMG/trust **#63–#66** without blocking stats activation.

**Rules:** no fake aggregates; privacy before public stats; close **#58–#62** on **hosted** proof — [closure model](mlp-next-delivery-tranche.md#board-closure-dashboard).
