# Install and run on macOS

**MVP v0.3.0** supports these paths:

| Path | When |
| ---- | ---- |
| **Path C — npm registry** | **Preferred** — `npm install -g @doneisbetter/cli` (**0.3.0** on npm). |
| **Path B — source** | Always works: clone, build, `npm install -g ./apps/cli`. |
| **Path D — DMG** | **`.dmg`** with `Impact.app` (maintainer-built). Offline-friendly; still needs **Node.js 20+** on the Mac. See [macos-distribution.md](macos-distribution.md) and `npm run build:dmg`. |

Maintainer publish flow: [npm-publish.md](npm-publish.md). DMG build: [`packaging/macos/README.md`](../packaging/macos/README.md). Binary spike: [#38](https://github.com/sovereignsquad/impact/issues/38).

## Requirements

- **macOS** 13+ recommended  
- **Node.js 20+** ([nodejs.org](https://nodejs.org/) or `brew install node@20`)  
- **Git** (required only for **Path B**)

---

## Path C — npm registry (preferred)

**No clone.** Requires `@doneisbetter/cli` to exist on the public registry (see [npmjs.com/package/@doneisbetter/cli](https://www.npmjs.com/package/@doneisbetter/cli)).

```bash
npm install -g @doneisbetter/cli
mkdir -p ./reports
impact scan --no-submit -o ./reports
open ./reports/impact-report.html
```

Published under npm org **doneisbetter**. If `npm install` fails, try Path B below or check [npmjs.com/package/@doneisbetter/cli](https://www.npmjs.com/package/@doneisbetter/cli).

### Troubleshooting

| Symptom | Likely cause | What to try |
| ------- | ------------ | ----------- |
| `npm ERR! 404 Not Found` for `@doneisbetter/cli` | Registry/network or typo in scope | Confirm **`@doneisbetter/cli`**; use **Path B** if registry is unreachable. |
| `EACCES` / permission errors on `npm install -g` | Global prefix not writable | Use a [Node version manager](https://github.com/nvm-sh/nvm) or configure `npm prefix` to a user-owned directory (see [npm docs](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)). |
| `command not found: impact` after global install | `PATH` missing npm’s global bin | Re-open the shell, or add the directory printed by `npm bin -g` to `PATH`. |
| Scan writes files but HTML looks sparse | Runtimes offline / no models | Start local runtimes (e.g. Ollama) and re-run; see **Suggested next steps** in `impact-report.html`. |

**Outputs:** `./reports/impact-profile.json`, `./reports/impact-report.html`

**Submission:** default scan does not upload. Optional: [submission-contract.md](submission-contract.md).

**Support:** [support-matrix.md](support-matrix.md) and the HTML report footer.

---

## Path B — build from clone

```bash
git clone https://github.com/sovereignsquad/impact.git
cd impact
npm ci
npm run build
npm install -g ./apps/cli
mkdir -p ./reports
impact scan --no-submit -o ./reports
open ./reports/impact-report.html
```

### Optional: pin a released version

```bash
git clone https://github.com/sovereignsquad/impact.git
cd impact
git checkout v0.3.0
npm ci
npm run build
npm install -g ./apps/cli
```

Release notes: [**v0.3.0**](https://github.com/sovereignsquad/impact/releases/tag/v0.3.0).

---

## Path D — DMG (`Impact.app`)

Use when you have a release **`Impact-{version}-macos.dmg`** (e.g. from a maintainer or GitHub Release attachment). Mount the image, read **README.txt**, drag **Impact.app** to **Applications**, then run from **Terminal** (the tool is CLI-first):

```bash
/Applications/Impact.app/Contents/MacOS/impact --version
mkdir -p ~/impact-reports
/Applications/Impact.app/Contents/MacOS/impact scan --no-submit -o ~/impact-reports
open ~/impact-reports/impact-report.html
```

**Requirements:** **Node.js 20+** must be installed separately ([nodejs.org](https://nodejs.org/) or Homebrew). The DMG bundles npm dependencies, not the Node runtime.

**Build (maintainers):** from repo root, on macOS: `npm run build:dmg` → `packaging/macos/out/Impact-0.3.0-macos.dmg` + `.sha256`. **Signing / notarization** are not automated here; Gatekeeper may require **Right-click → Open** the first time.

---

## Secondary: run without global install (repo developers only)

From repo root after `npm ci` and `npm run build`:

```bash
npm run impact -- scan --no-submit -o ./reports
```

**Onboarding and releases** use **Path C** (when live) or **Path B**, not this shortcut.

---

## Versioning

`impact --version` reads `@doneisbetter/cli`’s `package.json`. For audits, record **npm version**, **git tag**, or **commit SHA**.

## Release QA

- [Release checklist](release-checklist.md)  
- [macOS smoke test](smoke-test-macos.md)  
- [npm publish (maintainers)](npm-publish.md)
