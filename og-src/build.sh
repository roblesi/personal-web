#!/usr/bin/env bash
# Regenerate the resume Open Graph card at ../public/og-resume.jpg from og-card.html.
#
# On-demand only (NOT run in CI): the card changes rarely, only when the name,
# title, or tagline on it changes. Edit og-card.html, run this, commit the JPG.
#
# The card is rendered at 2x with headless Chrome and downscaled to 1200x630 for
# a crisp result. The Geist font is embedded at build time.
#
# Requires: Google Chrome, and Python 3 with Pillow (pip install pillow).
#
# Usage:  bash og-src/build.sh
set -euo pipefail
cd "$(dirname "$0")"

FONT="../public/fonts/geist.woff2"
CHROME="${CHROME_PATH:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
OUT="../public/og-resume.jpg"

B64="$(base64 < "$FONT" | tr -d '\n')"
TMP_HTML="$(mktemp -t ogcard-XXXX).html"
TMP_PNG="$(mktemp -t ogcard-XXXX).png"
trap 'rm -f "$TMP_HTML" "$TMP_PNG"' EXIT

python3 - "$B64" "$TMP_HTML" <<'PY'
import sys
b64, out = sys.argv[1], sys.argv[2]
open(out, "w").write(open("og-card.html").read().replace("__GEIST_B64__", b64))
PY

"$CHROME" --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --force-device-scale-factor=2 --window-size=1200,630 \
  --default-background-color=00000000 \
  --screenshot="$TMP_PNG" "file://$TMP_HTML" >/dev/null 2>&1

python3 - "$TMP_PNG" "$OUT" <<'PY'
import sys
from PIL import Image
src, out = sys.argv[1], sys.argv[2]
Image.open(src).convert("RGB").resize((1200, 630), Image.LANCZOS).save(out, "JPEG", quality=88, optimize=True)
PY

echo "Built $OUT"
