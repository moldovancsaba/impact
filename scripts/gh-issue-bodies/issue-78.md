## Objective

Implement **public shell** and **page header** as local GDS pattern contracts — replace duplicated `site-header` / nav / footer HTML across all MPAs.

## Unified context

GDS pattern families: **App shell (public)** + **Page header**. Current: copy-pasted header in every HTML file + `site-nav.ts` for active link. Target: React layout components (or shared partial) under Mantine.

## Scope

- `PublicShell` — brand, primary nav (Home, Install, Run, Submit, Data, Profile, GitHub), sticky header, footer with version line from `site-meta.ts`
- `PageHeader` — title, lead, optional breadcrumb, primary/secondary actions slot
- Wire shell on **one** full page first; then roll to remaining entry HTML files via shared layout
- Preserve `data-page` / active nav behavior (accessibility: `aria-current="page"`)
- Mobile: nav wraps intentionally (GDS responsive intent)

## Non-goals

- Page body content migration (**#79–#81**)
- Auth shell (no accounts)

## Acceptance checks

- [ ] All public routes share one shell implementation (no copy-paste header blocks)
- [ ] Keyboard + screen reader: nav landmarks, focus visible on links
- [ ] Footer version line still injected on every page
- [ ] Local adapter doc updated with contract paths

## Dependencies

- **#77** — Mantine root runtime

## Delivery artifact

- `apps/web/src/components/PublicShell.tsx`, `PageHeader.tsx`

## Board

**Backlog** — P2 · `area/platform` · tranche **G2**
