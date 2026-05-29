#!/usr/bin/env bash
# Configure npm publish auth from NPM_TOKEN (never commit the token).
# Usage:
#   export NPM_TOKEN='npm_…'    # from npmjs.com → Access Tokens → Granular or Classic (publish)
#   bash scripts/npm-auth-token.sh
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

ensure_node() {
  if command -v node >/dev/null 2>&1 && command -v npm >/dev/null 2>&1; then
    return 0
  fi
  export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  if [[ -s "$NVM_DIR/nvm.sh" ]]; then
    # shellcheck disable=SC1090
    . "$NVM_DIR/nvm.sh"
    if [[ -f "$ROOT/.nvmrc" ]]; then
      nvm use --silent 2>/dev/null || nvm install "$(cat "$ROOT/.nvmrc")" --silent
    else
      nvm use 24 --silent 2>/dev/null || true
    fi
  fi
  if ! command -v node >/dev/null 2>&1; then
    for bin in /opt/homebrew/bin /usr/local/bin; do
      if [[ -x "$bin/node" ]]; then
        export PATH="$bin:$PATH"
        break
      fi
    done
  fi
  if ! command -v node >/dev/null 2>&1; then
    for dir in "$HOME/.nvm/versions/node/"v*/bin; do
      if [[ -x "$dir/node" ]]; then
        export PATH="$dir:$PATH"
        break
      fi
    done
  fi
  command -v node >/dev/null 2>&1 && command -v npm >/dev/null 2>&1 || {
    echo "node/npm not on PATH. Try:" >&2
    echo "  source ~/.nvm/nvm.sh && nvm use" >&2
    echo "  # or install Node 24+ (see .nvmrc)" >&2
    exit 1
  }
}

ensure_node

if [[ -z "${NPM_TOKEN:-}" ]]; then
  echo "Paste your npm automation token (input hidden), then Enter:"
  read -rsp "NPM_TOKEN: " NPM_TOKEN
  echo ""
fi

if [[ -z "${NPM_TOKEN:-}" ]]; then
  echo "No token provided." >&2
  exit 1
fi

npm config set "//registry.npmjs.org/:_authToken" "$NPM_TOKEN" --location=user
echo "Configured ~/.npmrc (user). Verifying…"
npm whoami
echo "OK — run: npm run publish:npm:dry-run && npm run publish:npm"
