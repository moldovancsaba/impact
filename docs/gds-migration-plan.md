# GDS migration plan — `@impact/web`

**Status:** **Implemented in repo** (2026-05-23) — Mantine + React MPA; deploy to verify on production.  
**SSOT (design):** [general-design-system](https://github.com/moldovancsaba/general-design-system) v**2.2.0**  
**Execution:** GitHub issues **#76–#82** on [org project 4](https://github.com/orgs/sovereignsquad/projects/4/views/1)

## Why

`apps/web` is a **static Vite + custom CSS** marketing shell (`src/style.css`, DM Sans, teal tokens). The shared **General Design System (GDS)** requires **Mantine-only** product UI, shared pattern contracts, and a local **adapter doc**. Impact is **not yet** in the GDS portfolio matrix — this tranche fixes governance and sequences a real migration without blocking activation (**#34**, **#58–#62**).

## Non-goals

- Replacing CLI offline **`impact-report.html`** styling in this tranche  
- Benchmark overlays, accounts, native GUI  
- Blocking dashboard activation or npm publish on GDS completion  

## Archetype (GDS portfolio)

| Signal | Classification |
|--------|----------------|
| Stack | Static HTML + Vite + ~550 lines custom CSS |
| GDS archetype | **Custom local system** → target **Mantine-rooted** |
| Risk | **Medium** — parallel design authority; no React today |
| Priority vs activation | **Backlog** — freeze now; migrate after activation WIP stabilizes |

## Pattern inventory (current → GDS contract)

| Current (`apps/web`) | GDS pattern family |
|----------------------|-------------------|
| `site-header`, `site-nav.ts`, `site-footer` | **Public / app shell** |
| `hero`, `page-title`, `crumb` | **Page header** |
| `install.html`, `use.html`, `submit.html` | **Article / docs shell** |
| `truth-banner`, `stats-placeholder`, `#profile-error` | **State block** |
| `profile-table`, `data.html` tables, `data-grid` | **Responsive data view** |
| `placeholder-card` | **Metric / product card** |
| `.btn`, `.status-pill` | Mantine **Button** / **Badge** (thin wrappers) |

## Phases and issues

| Phase | Issue | Title | Board default |
|-------|-------|-------|---------------|
| **G0** | [#76](https://github.com/sovereignsquad/impact/issues/76) | Governance, adapter doc, Phase 0 freeze | Backlog |
| **G1** | [#77](https://github.com/sovereignsquad/impact/issues/77) | Mantine root runtime in `@impact/web` | Backlog |
| **G2** | [#78](https://github.com/sovereignsquad/impact/issues/78) | Public shell + page header contracts | Backlog |
| **G3** | [#79](https://github.com/sovereignsquad/impact/issues/79) | Article/docs pages (install, use, submit) | Backlog |
| **G4** | [#80](https://github.com/sovereignsquad/impact/issues/80) | Data + profile surfaces | Backlog |
| **G5** | [#81](https://github.com/sovereignsquad/impact/issues/81) | Homepage + legacy CSS deletion | Backlog |
| **G6** | [#82](https://github.com/sovereignsquad/impact/issues/82) | Enforcement + validation in CI | Backlog |

## Recommended sequence

1. **G0** — document SSOT, freeze `style.css`, map patterns (no UI rewrite).  
2. **Wait for activation capacity** — do not start G1 while **#58** activation sprint is the primary web ops focus unless explicitly staffed in parallel.  
3. **G1** — React + `@mantine/core` + `gds-theme` root provider; one smoke route proves build/deploy still works on Vercel.  
4. **G2** — shared shell used by all pages (single nav/footer contract).  
5. **G3 → G4 → G5** — migrate surfaces; preserve honest copy (#34 gate, ingest placeholders).  
6. **G6** — lint/import boundaries so custom CSS cannot return.  

## GDS repo side (maintainer)

- Add Impact row to `PROJECTS/PORTFOLIO_ADOPTION_MATRIX.md`  
- Optional: `PROJECTS/IMPACT_MANTINE_REFACTOR.md` mirroring this plan  

## Related docs

- [web.md](web.md) — current static shell  
- [gds-adapter.md](gds-adapter.md) — local adapter (filled by **#75**)  
- [project-management.md](project-management.md) — board SSOT  
