#!/usr/bin/env bash
# Publish all @doneisbetter/* workspaces to npm in dependency order.
# Prereq: npm auth; publish under npm org **doneisbetter** (@doneisbetter/* scope).
# Usage: from repo root —  npm run publish:npm
#        dry-run —          npm run publish:npm:dry-run
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

npm run build

ORDER=(
  @doneisbetter/schemas
  @doneisbetter/privacy
  @doneisbetter/scanner-host
  @doneisbetter/scanner-runtimes
  @doneisbetter/scanner-tools
  @doneisbetter/scanner-models
  @doneisbetter/core
  @doneisbetter/reporting
  @doneisbetter/submission
  @doneisbetter/cli
)

for pkg in "${ORDER[@]}"; do
  echo "==> $pkg"
  if [[ -n "${DRY_RUN:-}" ]]; then
    npm publish -w "$pkg" --access public --dry-run
  else
    npm publish -w "$pkg" --access public
  fi
done

echo "Done. Verify: npm view @doneisbetter/cli version && npm install -g @doneisbetter/cli@0.3.0 && impact --version"
