#!/usr/bin/env bash
# Add any GitHub issues that are missing from org Project 4 (Impact board).
# Safe to re-run: only calls item-add when issue number is not already on the board.
set -euo pipefail
REPO="sovereignsquad/impact"
OWNER="sovereignsquad"
PROJ="4"

boarded_json=$(gh project item-list "$PROJ" --owner "$OWNER" --format json -L 500)
boarded=$(echo "$boarded_json" | jq -r '.items[] | select(.content.type=="Issue") | .content.number' | sort -u)

while IFS= read -r num; do
  [[ -z "$num" ]] && continue
  if echo "$boarded" | grep -qx "$num"; then
    continue
  fi
  echo "Adding issue #${num} to project #${PROJ}…"
  gh project item-add "$PROJ" --owner "$OWNER" --url "https://github.com/${REPO}/issues/${num}" --format json >/dev/null
done < <(gh issue list --repo "$REPO" --state all --limit 500 --json number | jq -r '.[].number' | sort -n)

echo "Project board sync complete."
