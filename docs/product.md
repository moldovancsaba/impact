# I.M.P.A.C.T. — product definition

## Programme name (expanded)

**IMPACT** = **(I)ndustrial (M)ulti-(P)latform (A)gent (C)onnector (T)est**.

The programme targets a **fully sovereign** evaluation stack for **system + tool + LLM** behaviour—ultimately a **rigorous benchmark system** suitable for industrial and global use. **Planning and acceptance** live in [GitHub Issues](https://github.com/sovereignsquad/impact/issues) (issue bodies). **Workflow columns** (Todo / In Progress / Done) live on [org project 4](https://github.com/orgs/sovereignsquad/projects/4/views/1). **Authority map:** [ssot-map.md](ssot-map.md).

**Trust (users):** [privacy-for-users.md](privacy-for-users.md) · **Policy:** [privacy-policy.md](privacy-policy.md).

## v0.x discovery slice (shipping now)

**MVP status — delivered (v0.3.0):** the **discovery scanner** milestone is complete on `main` — see [user-expectations-mvp.md](user-expectations-mvp.md) for what is and is not shipped.

The **first concrete product** in the repo is a **privacy-first local scanner** that inventories a machine’s AI-relevant environment: installed runtimes, curated tools, and discovered models. It produces a **shareable anonymous profile** (JSON + HTML) and supports **optional, explicit-consent** submission. This **grounds** later benchmark phases in **observable truth** about what can run where.

Architect-oriented summary: [architect-handoff.md](architect-handoff.md).

This document is the canonical **product** spec for **v0.x / discovery MVP**. Issue **#1** is the living **doctrine anchor** on GitHub.

## Minimum Loveable Product (MLP) — after MVP

MVP proves **correctness** and **trust**. **MLP** targets **loveability**: easy install, rewarding first scan, clear next steps, shareable results, then early community value — **without** benchmark scores or hype. Full programme: **[mlp.md](mlp.md)**.

## MVP objective

Answer only:

> What AI-relevant environment does this computer have, and what local/cloud AI runtimes, tools, and models are available on it?

**In scope:** discovery and export. **Out of scope:** benchmarking, auto-fix, accounts, heavy agents, continuous telemetry.

## Recommended form (MVP)

- **Primary:** local **CLI** (desktop-first, developer-friendly).
- **Outputs:** single **HTML report** + **anonymised JSON** in the output directory.
- **Submission:** opt-in only, with preview of the exact payload.

Do **not** start with: cloud-first architecture, mandatory accounts, invasive permissions, background daemons, or auto-repair.

## Product principles

1. **Local-first** — scan works without network access.
2. **Explicit consent** — nothing leaves the machine without clear opt-in.
3. **Privacy by design** — no raw serial numbers, hardware UUIDs, usernames, hostnames, file contents, or environment secrets.
4. **Explainable output** — state what was found and confidence (detected / inferred / unknown).
5. **Conservative detection** — prefer “unknown” over fabrication.
6. **Low-friction install** — run a scan in minutes.

## MVP functional areas

| Area | Description |
| ---- | ----------- |
| Host | OS, arch, chip, memory, coarse disk, GPU hints where safe, machine class, salted coarse fingerprint |
| Runtimes | e.g. Ollama (install, version, reachability), MLX tooling where feasible |
| Tools | **Allowlist only** — editors, agents, runtime UIs, terminal tools |
| Models | Per supported runtime (e.g. Ollama API); locality and quantisation when exposed |
| Privacy & export | Denylist, anonymisation, JSON + HTML |
| Submission | Preview payload, confirm, optional POST to configured endpoint |

## Output schema

The machine-readable profile is versioned (`schema_version: "impact.v0.3"`) with **field provenance** (`source`, `probe`, `confidence`), **operational `status`** vs epistemic **`presence`**, and rule-based confidence ([confidence-rules.md](confidence-rules.md)). See `packages/schemas` and [fixtures/baseline-profile.sample.json](../fixtures/baseline-profile.sample.json).

## Roadmap phases (high level)

| Phase | Goal |
| ----- | ---- |
| **0** | Foundation — monorepo, schema, contracts, fixtures, privacy policy |
| **1** | MVP discovery scanner — host, runtimes, tools, models, reports, consent |
| **2** | Readiness hints — coarse rules, no benchmarks |
| **3** | Atomic benchmark foundation |
| **4** | Capability benchmarks |

## Definition of MVP done

A non-technical early adopter can:

1. Run the tool locally.
2. Complete a scan without deep AI knowledge.
3. See their AI-relevant environment summarised.
4. See detected models and tools (where supported).
5. Export a readable report.
6. Optionally submit an anonymous profile with informed consent.

## Command surface (MVP / `impact.v0.3`)

```bash
impact scan
impact scan --no-submit
impact scan -o ./reports
```

(`impact export` / `impact submit` may be added later; `scan` is the primary flow for MVP.)

## Internal product statements

**Programme:**

> IMPACT is the Industrial Multi-Platform Agent Connector Test: a sovereign path to benchmarking **system + tool + LLM** stacks without sacrificing privacy, explainability, or operational honesty.

**v0.x discovery:**

> The v0.x scanner inventories the AI-relevant environment on a machine and exports an anonymised, consent-gated profile—before benchmark probes attach.
