# Documentation alignment after packaging (D6)

**Purpose:** after a **distribution milestone**, run a **docs pass** so public copy matches what users run. Track milestones on [org project 4](https://github.com/orgs/sovereignsquad/projects/4) (not in prose here — see [ssot-map.md](ssot-map.md)).

- **Path B (source)** — **[#27](https://github.com/sovereignsquad/impact/issues/27)** **Done** on the board; README / [install-macos.md](install-macos.md) / [smoke-test-macos.md](smoke-test-macos.md) match verified commands.
- **Path C (npm)** — **[#34](https://github.com/sovereignsquad/impact/issues/34)**; **re-run this checklist** when `@impact/cli` is **publicly live** on the registry (or after any install UX change).
- **Standalone binary** — [#38](https://github.com/sovereignsquad/impact/issues/38) when applicable.

## Checklist

1. **[README.md](../README.md)** — **Quick start** matches the **one** canonical install path (npm global from clone, published `npm` package, or binary — whichever is declared done).
2. **[install-macos.md](install-macos.md)** — same path; remove or clearly mark stale “future” blocks that are now real.
3. **[smoke-test-macos.md](smoke-test-macos.md)** and **[release-checklist.md](release-checklist.md)** — commands and expected **outputs** (`impact-profile.json`, `impact-report.html`, optional submission files) match the CLI.
4. **[privacy-for-users.md](privacy-for-users.md)** / **[privacy-policy.md](privacy-policy.md)** — filenames for preview/receipt still match `packages/submission`.
5. **[docs/assets/impact-report-sample.png](assets/impact-report-sample.png)** — regenerate if the HTML report template changed.
6. **Terminology** — **scanner**, **profile**, **submission**, **presence**, **status**, **support** consistent across README, [current-state.md](current-state.md), [product.md](product.md).

**Rule:** every **promise** on the front page must match the **built** CLI behaviour after the packaging milestone merges.
