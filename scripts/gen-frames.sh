#!/usr/bin/env bash
# Extracts scroll-scrub frame sequences from the source oak clips into
# public/oak/<style>/ (widescreen, drawn on landscape/desktop) and
# public/oak/<style>/portrait/ (portrait, drawn on portrait phones), then writes
# public/oak/manifest.json. Sources live in media-src/ (gitignored), audio-stripped:
#   media-src/<file>.mp4           widescreen
#   media-src/portrait/<file>.mp4  portrait (optional, per style)
#
# Usage:  bash scripts/gen-frames.sh
# Tunables: FPS, WIDE_SCALE/PORT_SCALE (px wide), WIDE_Q/PORT_Q (ffmpeg qscale, lower=better)
set -euo pipefail

SRC="${SRC:-media-src}"
OUT="public/oak"
FPS="${FPS:-4}"                 # ~40 frames for a 10s clip
WIDE_SCALE="${WIDE_SCALE:-1280}"  # native source width (720p sources); higher just upscales
PORT_SCALE="${PORT_SCALE:-720}"   # native portrait source width
WIDE_Q="${WIDE_Q:-2}"
PORT_Q="${PORT_Q:-4}"

# key | widescreen source (no ext) | label | portrait source (no ext; empty = none)
STYLES=(
  "photoreal|A_photorealistic_cinematic_fil|Photoreal|A_photorealistic_cinematic_fil"
  "claymation|A_stop_motion_claymation_seque|Claymation|A_stop_motion_claymation_seque"
  "manga|A_black_ink_Japanese_manga_ill|Ink / manga|A_black_ink_Japanese_manga_ill"
  "blueprint|A_technical_blueprint_schemati|Blueprint|A_technical_blueprint_schemati"
  "lowpoly|A_stylized_low_poly_D_render_|Low-poly 3D|A_stylized_low_poly_D_render_"
  "vangogh|A_Vincent_van_Gogh_post_impres|Van Gogh|"
  "disney|A_classic_hand_drawn_Disney_st|Disney|"
  "marvel|A_bold_Marvel_style_comic_book|Marvel|"
  "ukiyoe|A_Katsushika_Hokusai_ukiyo_e_J|Ukiyo-e|"
  "pixel|A_bit_pixel_art_animation_|Pixel art|"
  "kirigami|A_layered_paper_cut_kirigami_d|Paper-cut|"
  "watercolor|A_loose_watercolor_painting_a|Watercolor|"
)

command -v ffmpeg >/dev/null || { echo "ffmpeg not found"; exit 1; }
rm -rf "$OUT"; mkdir -p "$OUT"

entries=()
for row in "${STYLES[@]}"; do
  IFS='|' read -r key file label pfile <<<"$row"
  mp4="$SRC/$file.mp4"
  if [[ ! -f "$mp4" ]]; then echo "!! missing $mp4 (skipping $key)"; continue; fi
  mkdir -p "$OUT/$key"
  ffmpeg -v error -i "$mp4" -vf "fps=${FPS},scale=${WIDE_SCALE}:-2:flags=lanczos" -qscale:v "$WIDE_Q" "$OUT/$key/f_%03d.jpg" -y
  n=$(ls "$OUT/$key"/f_*.jpg | wc -l | tr -d ' ')
  pentry=""
  if [[ -n "$pfile" && -f "$SRC/portrait/$pfile.mp4" ]]; then
    mkdir -p "$OUT/$key/portrait"
    ffmpeg -v error -i "$SRC/portrait/$pfile.mp4" -vf "fps=${FPS},scale=${PORT_SCALE}:-2:flags=lanczos" -qscale:v "$PORT_Q" "$OUT/$key/portrait/f_%03d.jpg" -y
    pn=$(ls "$OUT/$key/portrait"/f_*.jpg | wc -l | tr -d ' ')
    pentry=",\"pframes\":$pn"
    echo "  $key: $n frames + $pn portrait"
  else
    echo "  $key: $n frames"
  fi
  entries+=("{\"key\":\"$key\",\"label\":\"$label\",\"frames\":$n$pentry}")
done

# manifest.json (frame 001 = acorn, frame N = full oak)
{
  echo -n '{"styles":['
  IFS=,; echo -n "${entries[*]}"; unset IFS
  echo ']}'
} > "$OUT/manifest.json"

echo "wrote $OUT/manifest.json"
du -sh "$OUT"
