## Objective

Establish **GDS governance** for `@doneisbetter/web`: local adapter doc, **Phase 0 freeze** on custom CSS, pattern inventory, and portfolio classification — without starting Mantine migration yet.

## Unified context

[general-design-system](https://github.com/sovereignsquad/general-design-system) v**2.4.3** is the cross-project SSOT. Impact’s public web shell uses **~550 lines of custom CSS** (`apps/web/src/style.css`) — a **CSS authority conflict** under GDS. Activation work (**#34**, **#58–#62**) remains higher priority; this issue is **governance + freeze only**.

## Based on

- GDS `GOVERNANCE_AND_ADOPTION.md` — required local SSOT statement + implementation readiness
- GDS `PROJECTS/PORTFOLIO_ADOPTION_MATRIX.md` — Impact not yet listed
- [gds-migration-plan.md](../../docs/gds-migration-plan.md)

## Scope

- Finalize [docs/gds-adapter.md](../../docs/gds-adapter.md) (paths, exceptions, validation placeholders)
- Document **pattern inventory** (shell, page header, article pages, state blocks, data views) in migration plan
- **Freeze:** no new UI components or patterns in `style.css` after merge; new web UI waits for **#77+**
- Cross-link from [web.md](../../docs/web.md), [project-management.md](../../docs/project-management.md)
- Maintainer: open PR or issue on GDS repo to add **Impact** row to portfolio matrix (archetype: custom CSS → Mantine target)

## Non-goals

- Installing Mantine or React (**#77**)
- Visual redesign or token swap
- Changing honest install / ingest copy

## Acceptance checks

- [ ] `docs/gds-adapter.md` contains required GDS SSOT statement and legacy boundary
- [ ] `docs/gds-migration-plan.md` linked from web + programme docs
- [ ] CONTRIBUTING or docs index mentions GDS adapter path
- [ ] Team acknowledges **style.css freeze** in PR checklist for `@doneisbetter/web`
- [ ] GDS portfolio matrix updated (or tracking link in adapter doc if external PR pending)

## Dependencies

- None blocking — parallel to activation

## Out of scope

- CLI report HTML styling

## Risks

- Developers add new custom CSS during activation — mitigate with freeze note in `apps/web/README.md`

## Delivery artifact

- Docs: `gds-adapter.md`, `gds-migration-plan.md` updates; README cross-links

## Board

**Backlog** — P2 · `area/platform` · tranche **G0**
