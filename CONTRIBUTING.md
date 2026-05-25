# Contributing to Impact

Thank you for your interest in **Impact**. This project is open source under the [MIT License](LICENSE).

## Principles

- **Transparency:** Planning and priorities are visible on the GitHub Project board.
- **Issues first:** Substantive work should have (or get) an issue for discussion and traceability.
- **Small, reviewable changes:** Prefer focused pull requests linked to an issue.

## Where work is tracked

| What | Where |
| ---- | ----- |
| Roadmap themes, epics, sequencing | [sovereignsquad · impact board](https://github.com/orgs/sovereignsquad/projects/4/views/1) |
| Bug reports, feature requests, design discussion | [GitHub Issues](https://github.com/sovereignsquad/impact/issues) |
| Code review | Pull requests |

**Rule of thumb:** If it belongs on a roadmap, backlog, or todo list for Impact, it should exist as a **GitHub Issue** (or linked PR) and be **on the project board** with the right Status and fields. Avoid parallel trackers that drift out of sync.

See [docs/README.md](docs/README.md) for the documentation map, [docs/ssot-map.md](docs/ssot-map.md) for authority routing (Project vs issues vs `current-state`), [docs/mlp.md](docs/mlp.md) for the post-MVP **Minimum Loveable Product** track, and [docs/project-management.md](docs/project-management.md) for board workflow.

## Build from source

**Release parity:** use `npm ci` (same as README Quick start and [docs/install-macos.md](docs/install-macos.md)). For local iteration, `npm install` is acceptable.

```bash
npm ci                    # preinstall prepares GDS 2.4.3 (.gds-src) for @impact/web
npm run lint              # includes @gds/eslint-config rules on apps/web/src
npm run lint:gds          # GDS adoption manifest + compliance (web shell)
npm run build
npm test
npm run validate-fixtures
npm run validate-invalid-fixtures
npm run impact -- scan --no-submit -o ./reports
```

**Public marketing site:** `npm run dev:web` (Vite + **@gds/theme** / **@gds/core**) — [docs/web.md](docs/web.md), [docs/gds-adapter.md](docs/gds-adapter.md). PRs touching `apps/web/src` must not reintroduce local shell/pattern duplicates or raw color literals outside approved paths.

Releases: follow [docs/release-checklist.md](docs/release-checklist.md) and [docs/smoke-test-macos.md](docs/smoke-test-macos.md). **Version alignment** (Git tag, `@impact/*` semver, `schema_version`, `impact --version`): [docs/current-state.md](docs/current-state.md) — § **Versioning (SSOT)**.

## How to contribute

1. **Open or pick an issue** — describe the problem or goal; maintainers may add it to the project board.
2. **Fork and branch** — use a short branch name related to the issue (e.g. `fix-login-redirect`, `add-api-docs`).
3. **Implement and test** — follow existing patterns in the repo; add or update tests when applicable.
4. **Open a PR** — reference the issue (`Fixes #123` or `Refs #123`); link the PR to the board item if one exists.
5. **Respond to review** — keep changes scoped to the agreed issue.

## Code of conduct

Be respectful and constructive in issues and PRs. For a formal policy, we can adopt a standard contributor covenant via a follow-up issue on the board.

## Questions

Use [Discussions](https://github.com/sovereignsquad/impact/discussions) if enabled, or open an issue labeled appropriately once label conventions exist.
