#!/bin/bash
# Optional: symlink IMPACT CLI into /usr/local/bin (requires admin password).
set -euo pipefail
IMPACT_BIN="/Applications/Impact.app/Contents/MacOS/impact"
if [[ ! -x "$IMPACT_BIN" ]]; then
  echo "Install Impact.app to /Applications first, then run this again."
  read -r -p "Press Enter to close…"
  exit 1
fi
echo "This will run: sudo ln -sf \"$IMPACT_BIN\" /usr/local/bin/impact"
read -r -p "Continue? [y/N] " ans
if [[ "${ans,,}" != "y" ]]; then
  echo "Skipped. You can still run: $IMPACT_BIN scan --no-submit -o ./reports"
  read -r -p "Press Enter to close…"
  exit 0
fi
sudo ln -sf "$IMPACT_BIN" /usr/local/bin/impact
echo "Done. Try: impact --version"
read -r -p "Press Enter to close…"
