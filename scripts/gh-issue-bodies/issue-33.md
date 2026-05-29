**Status:** closed on GitHub (accepted 2026-04). Do not reopen for optional second-machine smoke — add evidence as a comment only.

## Objective

**Post-MVP release hardening** — short stabilisation after **v0.3.0** MVP tag.

## Scope

- Final wording pass (README, CHANGELOG, install warnings)
- Small bug sweep; `npm run verify:release` green on `main`
- Real-user validation runs (optional notes in comments)
- **Decision record:** next distribution path — publish `@doneisbetter/cli` vs standalone binary (no implementation required in this issue — spawn follow-ups)

## Non-goals

Benchmark features, GUI, platform expansion, DMG.

## Acceptance

- [x] `main` green; `npm run verify:release` passes locally / CI
- [x] Docs consistent with **v0.3.0** (optional tag checkout; release link)
- [x] Follow-up issues linked: **#34** (npm publish) default path; **#38** (binary spike); decision recorded in issue comments

## Based on

[Issue #1](https://github.com/sovereignsquad/impact/issues/1) post-MVP directive; CTO “Post-MVP Release Hardening”.
