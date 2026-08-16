# Open Graph cards

Source for the share images, the pictures that appear when a link to the site is
posted to Slack, iMessage, LinkedIn and so on.

| Card | Template | Output | Used by |
| --- | --- | --- | --- |
| Home | `og-home.html` | `public/og.jpg` | every page by default ([`Base.astro`](../src/layouts/Base.astro)) |
| Resume | `og-card.html` | `public/og-resume.jpg` | [`/resume`](../src/pages/resume.astro) |

Both are 1200x630, rendered at 2x with headless Chrome and downscaled for
sharpness. The Geist font is embedded as a data URI, and the home card also
embeds the oak frame it uses as a background, so the templates are self-contained.

## Regenerate

Only needed when a card's text changes (name, title, tagline) or you want a
different oak behind the home card. Requires Google Chrome and Python 3 with
Pillow (`pip install pillow`):

```bash
bash og-src/build.sh          # both cards
bash og-src/build.sh home     # just the home card
bash og-src/build.sh resume   # just the resume card
```

Then commit the updated JPEG(s).

To use a different oak style behind the home card, point `BG` in `build.sh` at
another frame, for example `../public/oak/ukiyoe/f_040.webp`.

## Note

This is on-demand only and is not part of the deploy, since the cards change
rarely. The generated JPEGs are committed (unlike the resume PDF, which CI
rebuilds on every push). This folder is not part of the Astro build output.
