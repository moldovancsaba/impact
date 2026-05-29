# macOS distribution decision (M1 / packaging SSOT)

**Status:** decision recorded for programme issues [#63](https://github.com/sovereignsquad/impact/issues/63)–[#66](https://github.com/sovereignsquad/impact/issues/66).  
**Build:** [`packaging/macos/`](../packaging/macos/) — `npm run build:dmg`.

**CTO status model (2026-04-10)** — see [mlp-next-delivery-tranche.md](mlp-next-delivery-tranche.md) § *CTO assessment — three distribution paths*:

| Stage | Issue | Call |
| ----- | ----- | ---- |
| **M1** | [#63](https://github.com/sovereignsquad/impact/issues/63) | **Done enough** (this doc + Path D docs). |
| **M2** | [#64](https://github.com/sovereignsquad/impact/issues/64) | **Partially to substantially done** (scripted DMG, artifact, install Path D). |
| **M3** | [#65](https://github.com/sovereignsquad/impact/issues/65) | **Not done** — Developer ID + notarization still required for trusted distribution. |
| **M4** | [#66](https://github.com/sovereignsquad/impact/issues/66) | **DMG produced** — **not** a finished **public-quality** Mac release until **M3** is done. |

**Positioning:** Path D is **meaningful engineering progress** — **not** “consumer Mac app shipped” until signing, notarization, and **published** artifact validation are complete.

## Decision

| Track | Choice |
| ----- | ------ |
| **Primary (low friction)** | **`npm install -g @doneisbetter/cli`** once [#34](https://github.com/sovereignsquad/impact/issues/34) has published the `@doneisbetter/*` scope ([npm-publish.md](npm-publish.md)). |
| **Offline / air-gapped / no registry** | **`Impact.app`** inside a **`.dmg`**, built by [`packaging/macos/build-dmg.sh`](../packaging/macos/build-dmg.sh): bundles CLI `dist/` and production **`node_modules`** (no separate compile-to-binary step). |
| **Node runtime** | **Not embedded** in the DMG (keeps image smaller; aligns with documented requirement Node 20+). Embedding Node is a future option if we need a true “no prerequisites” installer. |
| **DMG** | **Packaging layer** — reproducible **local** build exists; **public-quality** delivery still **depends on M3**. **Not** a substitute for npm or clone builds; **do not overclaim** until signed + notarized + validated on a **released** artifact. |
| **Signing / notarization** | **Follow-up** ([#65](https://github.com/sovereignsquad/impact/issues/65)): Developer ID + notarization for wide distribution; current script uses **ad-hoc** codesign only. |

## Release implications

- **Versioning:** DMG filename uses `apps/cli` **semver** (same SSOT as npm — [current-state.md](current-state.md)).
- **Support:** DMG users run the CLI from **`Impact.app/Contents/MacOS/impact`** (see README on the disk image and [install-macos.md](install-macos.md) Path D).

## What we are not doing in this tranche

- Native rewrite (Rust/Go) for a single-file binary.
- Full GUI `.app` — CLI only inside the bundle.
