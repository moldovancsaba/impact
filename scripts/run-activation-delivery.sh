#!/usr/bin/env bash
# Run the five activation deliverables (non-GDS). Exits non-zero on hard failures; prints blockers for credential gaps.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
WEB="${WEB_ORIGIN:-https://impact.sovereignsquad.com}"
INGEST_ORIGIN="${INGEST_ORIGIN:-https://impact-mm-ingest.fly.dev}"
REPORT="$ROOT/docs/activation-delivery-$(date +%Y%m%d).md"

log() { echo "==> $*"; }
blocker() { echo "BLOCKER: $*" >&2; BLOCKERS+=("$*"); }

BLOCKERS=()

log "Activation delivery pass — $(date -u +%Y-%m-%dT%H:%MZ)"
log "Report: $REPORT"

# --- 1. #34 npm publish ---
log "[1/5] #34 npm Path C"
if npm whoami >/dev/null 2>&1; then
  if npm view @impact/cli version >/dev/null 2>&1; then
    log "  @impact/cli already on npm: $(npm view @impact/cli version)"
  else
    log "  Publishing @impact/* …"
    npm run publish:npm || blocker "npm publish failed"
  fi
else
  blocker "#34 — run: npm login && npm run publish:npm"
fi

# --- 2. Hosted ingest #58 ---
log "[2/5] #58 hosted ingest"
if curl -sfS "${INGEST_ORIGIN}/health" >/dev/null 2>&1; then
  log "  Ingest already up: ${INGEST_ORIGIN}/health"
else
  if flyctl auth whoami >/dev/null 2>&1; then
    bash "$ROOT/scripts/deploy-ingest-fly-and-wire-vercel.sh" || blocker "Fly deploy script failed"
  elif [[ -n "${FLY_API_TOKEN:-}" ]]; then
    flyctl deploy --config fly.ingest.toml --remote-only || blocker "flyctl deploy failed"
  else
    blocker "#58 — add GitHub secret FLY_API_TOKEN and run workflow 'Deploy ingest (Fly.io)', or: flyctl auth login && bash scripts/deploy-ingest-fly-and-wire-vercel.sh"
  fi
fi

# --- 3. Wire upstream + seed ---
log "[3/5] Vercel upstream + seed"
if curl -sfS "${INGEST_ORIGIN}/health" >/dev/null 2>&1; then
  if command -v vercel >/dev/null 2>&1 && vercel whoami >/dev/null 2>&1; then
    bash "$ROOT/scripts/vercel-wire-ingest-upstream.sh" "${INGEST_ORIGIN}" || blocker "vercel wire failed"
    sleep 15
    health="$(curl -sS "${WEB}/api/health" || true)"
    echo "  ${WEB}/api/health → ${health}"
    if echo "$health" | grep -q '"stats_mode":"upstream"'; then
      log "  stats_mode upstream OK"
    else
      blocker "Vercel /api/health still not upstream (propagation or env)"
    fi
    bash "$ROOT/scripts/seed-ingest-submissions.sh" "${INGEST_ORIGIN}/" 6 || blocker "seed failed"
  else
    blocker "#61 — vercel CLI login required for IMPACT_INGEST_UPSTREAM"
  fi
else
  blocker "#59–#60 — ingest not reachable; seed skipped"
fi

# --- 4. #62 /data.html proof ---
log "[4/5] #62 public /data.html"
if curl -sfS "${WEB}/data.html" >/dev/null 2>&1; then
  log "  ${WEB}/data.html → 200"
  curl -sS "${WEB}/api/stats/full" | head -c 400
  echo ""
else
  blocker "#62 — ${WEB}/data.html not reachable"
fi

# --- 5. #44 Path C primary copy ---
log "[5/5] #44 Path C primary copy"
if npm view @impact/cli version >/dev/null 2>&1; then
  node "$ROOT/scripts/flip-path-c-primary-copy.mjs" || blocker "#44 copy flip script failed"
  log "  Rebuild and deploy web after copy flip: npm run build -w @impact/web && vercel --prod --yes"
else
  blocker "#44 — skipped until @impact/cli is on npm (honest install gate)"
fi

# --- Report ---
{
  echo "# Activation delivery — $(date -u +%Y-%m-%d)"
  echo ""
  echo "| Step | Target | Result |"
  echo "|------|--------|--------|"
  if npm view @impact/cli version >/dev/null 2>&1; then
    echo "| 1 #34 npm | @impact/cli | **$(npm view @impact/cli version)** |"
  else
    echo "| 1 #34 npm | publish | **blocked** |"
  fi
  if curl -sfS "${INGEST_ORIGIN}/health" >/dev/null 2>&1; then
    echo "| 2 #58 ingest | ${INGEST_ORIGIN} | **up** |"
  else
    echo "| 2 #58 ingest | Fly | **blocked** |"
  fi
  echo "| 3 upstream+seed | Vercel + ingest | see /api/health |"
  echo "| 4 #62 /data.html | ${WEB}/data.html | checked |"
  echo "| 5 #44 copy | Path C primary | see blocker list |"
  if ((${#BLOCKERS[@]})); then
    echo ""
    echo "## Blockers"
    for b in "${BLOCKERS[@]}"; do echo "- $b"; done
  fi
} >"$REPORT"

log "Wrote $REPORT"
if ((${#BLOCKERS[@]})); then
  printf '%s\n' "${BLOCKERS[@]}" >&2
  exit 2
fi
log "Activation delivery complete."
