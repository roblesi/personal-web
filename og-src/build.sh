#!/usr/bin/env bash
# Regenerate the Open Graph share cards (the images shown when a link is posted
# to Slack, iMessage, LinkedIn, etc.):
#
#   ../public/og.jpg         home card   <- og-home.html (oak background)
#   ../public/og-resume.jpg  resume card <- og-card.html
#
# On-demand only, not part of the deploy: the cards change rarely, only when the
# name, title or tagline on them changes. Edit the template, run this, commit the
# JPEG.
#
# Each card is rendered at 2x with headless Chrome and downscaled to 1200x630 for
# a crisp result. The Geist font (and, for the home card, the oak frame) are
# embedded as data URIs so the templates are self-contained.
#
# Requires: Google Chrome, and Python 3 with Pillow (pip install pillow).
#
# Usage:  bash og-src/build.sh            # both cards
#         bash og-src/build.sh home       # just the home card
#         bash og-src/build.sh resume     # just the resume card
set -euo pipefail
cd "$(dirname "$0")"

FONT="../public/fonts/geist.woff2"
# Background for the home card: the full-oak frame of the photoreal style.
BG="../public/oak/photoreal/f_040.webp"
CHROME="${CHROME_PATH:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

GEIST_B64="$(base64 < "$FONT" | tr -d '\n')"

# $1 = template html, $2 = output jpg, $3 = "yes" to embed the oak background
render() {
  local tpl="$1" out="$2" withbg="${3:-no}"
  local tmp_html tmp_png
  tmp_html="$(mktemp -t ogcard-XXXX).html"
  tmp_png="$(mktemp -t ogcard-XXXX).png"
  trap 'rm -f "$tmp_html" "$tmp_png"' RETURN

  local bg_b64=""
  [[ "$withbg" == "yes" ]] && bg_b64="$(base64 < "$BG" | tr -d '\n')"

  GEIST="$GEIST_B64" BG64="$bg_b64" python3 - "$tpl" "$tmp_html" <<'PY'
import os, sys
tpl, out = sys.argv[1], sys.argv[2]
html = open(tpl).read()
html = html.replace("__GEIST_B64__", os.environ["GEIST"])
html = html.replace("__BG_B64__", os.environ.get("BG64", ""))
open(out, "w").write(html)
PY

  "$CHROME" --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
    --force-device-scale-factor=2 --window-size=1200,630 \
    --default-background-color=00000000 \
    --screenshot="$tmp_png" "file://$tmp_html" >/dev/null 2>&1

  python3 - "$tmp_png" "$out" <<'PY'
import sys
from PIL import Image
src, out = sys.argv[1], sys.argv[2]
Image.open(src).convert("RGB").resize((1200, 630), Image.LANCZOS).save(out, "JPEG", quality=88, optimize=True)
PY
  echo "Built $out"
}

target="${1:-all}"
[[ "$target" == "all" || "$target" == "home"   ]] && render og-home.html ../public/og.jpg yes
[[ "$target" == "all" || "$target" == "resume" ]] && render og-card.html ../public/og-resume.jpg no
exit 0
