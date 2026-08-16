#!/usr/bin/env python3
"""Convert the PNG frames ffmpeg wrote in a directory to WebP, then drop the PNGs.

ffmpeg here has no libwebp, so frames are extracted losslessly as PNG and encoded
with Pillow. Quality is chosen to be visually lossless (see scripts/gen-frames.sh).

Usage: png2webp.py <dir> <quality>
"""
import sys
from pathlib import Path

from PIL import Image

directory, quality = Path(sys.argv[1]), int(sys.argv[2])
pngs = sorted(directory.glob("f_*.png"))
for png in pngs:
    with Image.open(png) as im:
        im.convert("RGB").save(png.with_suffix(".webp"), "WEBP", quality=quality, method=6)
    png.unlink()
print(f"    {len(pngs)} frames -> webp q{quality}")
