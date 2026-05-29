# macOS smoke test — IMPACT (release candidate)

**Purpose:** Prove installs work on a **clean** macOS machine — **Path C (registry)** when published, else **Path B (source)**.

**Non-goals:** Submission is off unless you add steps (default `--no-submit`).

## Environment

- macOS 13+ (Apple Silicon or Intel)
- [Node.js 20+](https://nodejs.org/) (`node -v`)
- [Git](https://git-scm.com/) — for **Path B** only

---

## Path C — registry install (preferred when `@doneisbetter/cli` is on npm)

**Prerequisite:** `npm view @doneisbetter/cli version` succeeds (package published per [npm-publish.md](npm-publish.md)).

```bash
npm install -g @doneisbetter/cli
```

Verify:

```bash
impact --version
```

Expected: **`0.3.0`** (or current published semver).

### Run scan (no submission)

```bash
mkdir -p ~/impact-smoke-out
impact scan --no-submit -o ~/impact-smoke-out
```

Same **acceptance checks** as Path B below. Teardown: `npm uninstall -g @doneisbetter/cli`.

---

## Path B — npm global from built repo

**clone → install → build → global CLI → scan**

```bash
git clone https://github.com/sovereignsquad/impact.git
cd impact
npm ci
npm run build
npm install -g ./apps/cli
```

Verify CLI:

```bash
impact --version
```

Expected: **`0.3.0`** when aligned with the **v0.3.0** tag / release.

## Run scan (no submission)

```bash
mkdir -p ~/impact-smoke-out
impact scan --no-submit -o ~/impact-smoke-out
```

## Acceptance checks

| Check | How |
| ----- | --- |
| JSON written | `test -f ~/impact-smoke-out/impact-profile.json` |
| HTML written | `test -f ~/impact-smoke-out/impact-report.html` |
| No silent upload | Did **not** set `IMPACT_SUBMIT_URL`; used `--no-submit` |
| Docs match commands | Same sequence as [install-macos.md](install-macos.md) and README Quick start |

Open the report:

```bash
open ~/impact-smoke-out/impact-report.html
```

## Handoff evidence (paste in release / #34)

Record:

1. `node -v` and `npm -v`
2. Path **C** or **B**
3. `impact --version`
4. `ls -la ~/impact-smoke-out/impact-profile.json ~/impact-smoke-out/impact-report.html`
5. Optional: `jq .schema_version ~/impact-smoke-out/impact-profile.json` (expect `impact.v0.3`)
6. Open `impact-report.html` and confirm sections **At a glance**, **Suggested next steps**, and **Known limitations** are present (MLP report layout).

## Teardown

```bash
npm uninstall -g @doneisbetter/cli
rm -rf ~/impact-smoke-out
# optional: rm -rf impact clone
```

## Verification log (maintainers)

| Date | Source | `node -v` | `impact --version` | `schema_version` (from profile) | Result |
| ---- | ------ | --------- | ------------------ | --------------------------------- | ------ |
| 2026-04-03 | Fresh `git clone` of `https://github.com/sovereignsquad/impact` @ `55f01a6` (`main`) | v25.8.2 | `0.1.0` | `impact.v0.3` | PASS — pre-release CLI semver |
| 2026-04-03 | Fresh `git clone` at **tag `v0.3.0`** | v25.8.2 | `0.3.0` | `impact.v0.3` | PASS — Path B; `impact --version` from `package.json`; `--no-submit` |
| *(add row)* | **`npm install -g @doneisbetter/cli`** (Path C) | | `0.3.0` | `impact.v0.3` | *(after first npm publish)* |
