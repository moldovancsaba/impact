#!/usr/bin/env bash
# Build a compressed DMG containing Impact.app (CLI + production node_modules).
# Requires: macOS, Node 20+, npm. Run from repo root: npm run build:dmg
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

VERSION="$(node -p "require('./apps/cli/package.json').version")"
STAGING="$ROOT/packaging/macos/.staging"
STAGE="$STAGING/stage"
APP="$STAGE/Impact.app"
OUT="$ROOT/packaging/macos/out"
DMG_NAME="Impact-${VERSION}-macos.dmg"

if [[ "$(uname -s)" != "Darwin" ]]; then
  echo "This script must run on macOS (hdiutil)." >&2
  exit 1
fi

rm -rf "$STAGING" "$OUT"
mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources/app" "$OUT"

echo "==> npm install"
npm install

echo "==> build workspaces"
npm run build

echo "==> prune devDependencies (smaller DMG)"
npm prune --omit=dev

echo "==> stage Impact.app (CLI dist + production-lite modules)"
cp "$ROOT/apps/cli/package.json" "$APP/Contents/Resources/app/"
cp -R "$ROOT/apps/cli/dist" "$APP/Contents/Resources/app/dist"

# Standard build: Use the already pruned root production modules but WITHOUT flattening (-L) 
# to avoid monorepo exponential expansion. Monorepo node_modules is fine if linked correctly.
cp -R "$ROOT/node_modules" "$APP/Contents/Resources/app/node_modules"

cat > "$APP/Contents/MacOS/impact" <<'EOF'
#!/bin/bash
APP_RES="$(cd "$(dirname "$0")/../Resources/app" && pwd)"
exec /usr/bin/env node "$APP_RES/dist/cli.js" "$@"
EOF
chmod +x "$APP/Contents/MacOS/impact"

sed "s/VERSION_PLACEHOLDER/${VERSION}/g" "$ROOT/packaging/macos/Info.plist.in" > "$APP/Contents/Info.plist"

cp "$ROOT/packaging/macos/README-VOLUME.txt" "$STAGE/README.txt"
cp "$ROOT/packaging/macos/setup-path.command" "$STAGE/setup-path.command"
chmod +x "$STAGE/setup-path.command"

echo "==> smoke: bundled CLI"
"$APP/Contents/MacOS/impact" --version

echo "==> ad-hoc codesign (local Gatekeeper)"
codesign --force --deep -s - "$APP" 2>/dev/null || echo "(codesign skipped)"

echo "==> create DMG"
hdiutil create -volname "Impact ${VERSION}" -srcfolder "$STAGE" -ov -format UDZO "$OUT/$DMG_NAME"

echo "==> SHA-256"
( cd "$OUT" && shasum -a 256 "$DMG_NAME" | tee "${DMG_NAME}.sha256" )

if [[ -n "${APPLE_TEAM_ID:-}" ]]; then
  echo "==> macOS Signing & Notarization (#65)"
  "$ROOT/scripts/macos-sign-notarize.sh" "$OUT/$DMG_NAME"
fi

echo "==> restore dev dependencies (npm ci)"
npm ci

echo "Done: $OUT/$DMG_NAME"
