# Open Graph card (resume)

Source for the resume share image at `public/og-resume.jpg`, referenced by
[`src/pages/resume.astro`](../src/pages/resume.astro) as its `og:image` (the card
shown when the `/resume` link is shared on Slack, iMessage, LinkedIn, etc.).

- `og-card.html` — the 1200x630 card markup (Geist embedded at build time).
- `build.sh` — renders it to `../public/og-resume.jpg`.

## Regenerate

Only needed when the card's text changes (name, title, tagline). Requires Google
Chrome and Python 3 with Pillow (`pip install pillow`):

```bash
bash og-src/build.sh
```

Then commit the updated `public/og-resume.jpg`.

## Note

This is on-demand only and is not part of the deploy, since the card changes
rarely. `public/og-resume.jpg` is committed (unlike the resume PDF, which is
generated in CI). This folder is not part of the Astro build output.
