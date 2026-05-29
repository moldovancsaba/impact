## Objective

Migrate **data** and **profile** surfaces to GDS **State block** + **Responsive data view** contracts — live stats and profile explorer under Mantine.

## Unified context

`/data.html` fetches aggregates when `VITE_STATS_API_BASE` is set; otherwise honest placeholders. `/profile.html` validates local JSON client-side. Both use custom tables and placeholder cards today.

## Scope

- `StateBlock` — loading, empty, error, permission-style states for stats fetch and profile validation errors
- `StatsTable` / responsive data view — Mantine `Table` or `ScrollArea` for hardware/tools/models sections
- Preserve [stats-api-url.ts](../../apps/web/src/stats-api-url.ts) behavior and privacy-threshold copy
- Profile explorer: `@doneisbetter/schemas` validation UX unchanged in behavior
- Placeholder cards → Mantine `Paper` / `Card` with honest labels (no fake counts)

## Non-goals

- Ingest backend (**#58**)
- Benchmark overlays

## Acceptance checks

- [ ] `/data.html` — fallback and live-stats modes both render correctly
- [ ] `/profile.html` — drop zone + error states use shared StateBlock
- [ ] Mobile: tables scroll horizontally without layout break
- [ ] `/api/health` smoke unchanged (build-time env only)

## Dependencies

- **#78** — public shell
- **#62** — product acceptance for live aggregates (can migrate UI before hosted proof)

## Delivery artifact

- `StateBlock.tsx`, data/profile page modules

## Board

**Backlog** — P2 · `area/platform` · tranche **G4**
