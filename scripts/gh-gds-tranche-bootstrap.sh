#!/usr/bin/env bash
# One-off: create GDS migration issues #76–#82, add to org project 4, set Backlog.
# Requires: gh auth, jq. Safe to re-run only if issues do not exist yet.
set -euo pipefail

REPO="sovereignsquad/impact"
OWNER="sovereignsquad"
PROJ="4"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BD="$ROOT/scripts/gh-issue-bodies"
PROJECT_ID="PVT_kwDOEEuBB84BTwCK"
STATUS_FIELD="PVTSSF_lADOEEuBB84BTwCKzhA81Ew"
BACKLOG=53cb63a1

if ! command -v jq &>/dev/null; then
  echo "jq is required" >&2
  exit 1
fi

latest=$(gh issue list --repo "$REPO" --state all --limit 1 --json number | jq -r '.[0].number')
if [[ "${latest:-0}" -ge 76 ]]; then
  echo "Issues #76+ already exist (latest #$latest). Skipping create; run apply-updates.sh + apply-status.sh."
  exit 0
fi

add_to_project() {
  local url="$1"
  local json item_id
  json=$(gh project item-add "$PROJ" --owner "$OWNER" --url "$url" --format json)
  item_id=$(echo "$json" | jq -r .id)
  gh project item-edit \
    --id "$item_id" \
    --project-id "$PROJECT_ID" \
    --field-id "$STATUS_FIELD" \
    --single-select-option-id "$BACKLOG"
}

create_boarded() {
  local title="$1"
  local file="$2"
  local url
  url=$(gh issue create --repo "$REPO" --title "$title" --body-file "$BD/$file" --label "P2" --label "area/platform")
  add_to_project "$url" "$BACKLOG"
  echo "$url"
}

echo "Creating GDS tranche issues #76–#82…"

create_boarded "IMPACT P2: GDS G0 — Governance, adapter doc, and CSS freeze" issue-75.md
create_boarded "IMPACT P2: GDS G1 — Mantine root runtime in @impact/web" issue-76.md
create_boarded "IMPACT P2: GDS G2 — Public shell and page header contracts" issue-77.md
create_boarded "IMPACT P2: GDS G3 — Migrate install, use, submit pages" issue-78.md
create_boarded "IMPACT P2: GDS G4 — Migrate data and profile surfaces" issue-79.md
create_boarded "IMPACT P2: GDS G5 — Homepage migration and legacy CSS deletion" issue-80.md
create_boarded "IMPACT P2: GDS G6 — GDS enforcement and CI validation" issue-81.md

echo ""
echo "Done. Fetch item IDs for apply-status.sh:"
echo "  gh project item-list $PROJ --owner $OWNER --format json -L 500 | jq '.items[] | select(.content.number >= 75)'"
