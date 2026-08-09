#!/usr/bin/env bash
# Extracts scroll-scrub frame sequences from the source oak clips into public/oak/<style>/,
# and writes public/oak/manifest.json. Source .mp4s live in media-src/ (gitignored).
#
# Usage:  bash scripts/gen-frames.sh
# Tunables: FPS (frames/sec sampled), SCALE (px wide), Q (ffmpeg qscale, lower=better)
set -euo pipefail

SRC="${SRC:-media-src}"
OUT="public/oak"
FPS="${FPS:-4}"        # ~40 frames for a 10s clip
SCALE="${SCALE:-1100}"
Q="${Q:-3}"

# ordered: key | source filename (no ext) | label
STYLES=(
  "photoreal|A_photorealistic_cinematic_fil|Photoreal"
  "claymation|A_stop_motion_claymation_seque|Claymation"
  "manga|A_black_ink_Japanese_manga_ill|Ink / manga"
  "blueprint|A_technical_blueprint_schemati|Blueprint"
  "lowpoly|A_stylized_low_poly_D_render_|Low-poly 3D"
  "vangogh|A_Vincent_van_Gogh_post_impres|Van Gogh"
  "disney|A_classic_hand_drawn_Disney_st|Disney"
  "marvel|A_bold_Marvel_style_comic_book|Marvel"
)

command -v ffmpeg >/dev/null || { echo "ffmpeg not found"; exit 1; }
rm -rf "$OUT"; mkdir -p "$OUT"

entries=()
for row in "${STYLES[@]}"; do
  IFS='|' read -r key file label <<<"$row"
  mp4="$SRC/$file.mp4"
  if [[ ! -f "$mp4" ]]; then echo "!! missing $mp4 (skipping $key)"; continue; fi
  mkdir -p "$OUT/$key"
  ffmpeg -v error -i "$mp4" -vf "fps=${FPS},scale=${SCALE}:-1:flags=lanczos" -qscale:v "$Q" "$OUT/$key/f_%03d.jpg" -y
  n=$(ls "$OUT/$key" | wc -l | tr -d ' ')
  echo "  $key: $n frames"
  entries+=("{\"key\":\"$key\",\"label\":\"$label\",\"frames\":$n}")
done

# manifest.json (frame 001 = acorn, frame N = full oak)
{
  echo -n '{"styles":['
  IFS=,; echo -n "${entries[*]}"; unset IFS
  echo ']}'
} > "$OUT/manifest.json"

echo "wrote $OUT/manifest.json"
du -sh "$OUT"
