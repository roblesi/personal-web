#!/usr/bin/env bash
# Rebuild the resume PDF from resume.html into ../public/resume.pdf
#
# resume.html keeps a __GEIST_B64__ placeholder; the Geist font is embedded at
# build time so the PDF is fully self-contained. Rendered with headless Chrome.
#
# This directory is NOT part of the Astro build output (only public/ and
# src/pages are published), so the source is never served or indexed on the site.
#
# Usage:  bash resume-src/build.sh
set -euo pipefail
cd "$(dirname "$0")"

FONT="../public/fonts/geist.woff2"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="../public/resume.pdf"

B64="$(base64 < "$FONT" | tr -d '\n')"
TMP="$(mktemp -t resume-XXXX).html"
trap 'rm -f "$TMP"' EXIT

python3 - "$B64" "$TMP" <<'PY'
import sys
b64, out = sys.argv[1], sys.argv[2]
open(out, "w").write(open("resume.html").read().replace("__GEIST_B64__", b64))
PY

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --run-all-compositor-stages-before-draw --virtual-time-budget=3000 \
  --print-to-pdf="$OUT" "file://$TMP" >/dev/null 2>&1

echo "Built $OUT"
