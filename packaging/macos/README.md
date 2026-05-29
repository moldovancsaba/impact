# macOS DMG packaging

**Purpose:** produce **`Impact-{version}-macos.dmg`** with **`Impact.app`**: the CLI entrypoint plus **production** `node_modules` (workspace packages resolved to real files via `cp -RL`).

**Prerequisites:** macOS, Node 20+, `npm`. Notarization and Apple Developer ID signing are **out of scope** for this script; it applies **ad-hoc** `codesign` so local runs are easier.

## Build

From repository root:

```bash
npm run build:dmg
```

Artifacts:

- `packaging/macos/out/Impact-0.3.0-macos.dmg`
- `packaging/macos/out/Impact-0.3.0-macos.dmg.sha256`

Staging under `packaging/macos/.staging/` is ephemeral (gitignored). The DMG includes **`setup-path.command`** (optional `/usr/local/bin/impact` symlink) and **`README.txt`** on the volume.

## Distribution decision (summary)

See [macos-distribution.md](../../docs/macos-distribution.md): **standalone `.app` bundle + DMG** for offline-friendly installs; **npm** ([Path C](../../docs/install-macos.md)) remains the preferred path when the registry package exists. **DMG does not embed Node** — users need **Node.js 20+** on the Mac.

## Uninstall / update

- **Uninstall:** delete `Impact.app` from Applications (and any symlink you added).
- **Update:** download a newer DMG, replace the app, or use `npm install -g @doneisbetter/cli@<version>` when publishing to npm.

## CI

DMG creation is **macOS-only** (`hdiutil`). Run this on a Mac release runner or locally for releases.
