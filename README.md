# ignaciorobl.es

Source for my personal site, live at **[ignaciorobl.es](https://ignaciorobl.es)**.

*Robles* means *oaks* in Spanish. So the site is one: a full-grown oak fills the
screen, and scrolling down rewinds it frame by frame, back through a sapling, back
to the acorn it came from, resting in a patch of grass. The career timeline
rewinds with it, newest at the top, education down at the roots.

Built with [Astro](https://astro.build), deployed to GitHub Pages.

---

## How the oak works

The oak is a **scroll-scrubbed frame sequence** drawn to a fixed `<canvas>`:
40 stills per style, with scroll position selecting the frame. Top of the page is
the full oak, bottom is the acorn.

**Why frames and not `<video>`.** Scrubbing a video means seeking it, and seeking
needs HTTP range requests. Range support is not guaranteed by every static host or
local dev server, and when it is missing the video reports an empty `seekable`
range and simply refuses to scrub. Frames are dumb, cacheable GETs that work
everywhere and give exact, deterministic control over which image is on screen at
a given scroll offset.

**Progressive loading.** A naive implementation preloads all 40 frames before
showing anything, which blocks a first visit on megabytes of images. Instead the
hero requests the single frame that is on screen right now at high priority,
reveals it the moment it arrives, then streams the other 39 in the background.

| | all-frames preload | progressive |
| --- | --- | --- |
| bytes before the oak appears | ~3.3 MB | **~85 KB** |
| slow 4G (3 Mbps) | ~9.3 s | **~0.2 s** |

If you scroll faster than frames arrive, the canvas holds the last decoded frame
rather than blanking, so the animation degrades to a lower frame rate instead of
breaking.

**Frame format.** WebP, chosen at a quality measured to be visually lossless
(PSNR ~42 dB against the lossless source on the busiest frame) while being about
a third smaller than the equivalent JPEG. The sources are 720p, so frames are
extracted at native width; upscaling past that would add bytes without detail.

**Orientation-aware assets.** Cropping a widescreen oak to a phone screen looks
bad, so eight styles have separate portrait renders. Portrait viewports draw from
the portrait set and only pick styles that have one. Rotating the device swaps
frame sets.

**Art styles.** 15 of them (photoreal, claymation, ukiyo-e, chalkboard,
bioluminescent, felted wool, and so on), generated with Google Veo and picked at
random per visit, so the site rarely looks the same twice. The dice in the corner
rerolls it, and so does pulling down from the top on a touch device, where an
acorn sprouts as you release.

Getting a clean acorn-to-oak clip out of a video model took explicit prompt
structure: a locked camera, a fixed palette, and a four-stage acorn lifecycle
(whole acorn, split and sprout, absorbed by the trunk, gone) stated literally,
plus negative prompts. Without it the model would grow a tree *behind* an intact
acorn, or leave a stray acorn sitting at the base of the mature tree.

## Stack

- **[Astro](https://astro.build) 5** static output, zero client framework
- Vanilla TypeScript in component `<script>` blocks (the whole site ships ~5 KB of JS)
- Plain CSS, one stylesheet, custom properties for the palette
- [Geist](https://vercel.com/font) variable font, self-hosted and preloaded
- GitHub Actions to GitHub Pages, custom domain, HTTPS enforced

## Layout

```
src/
  pages/          index.astro, resume.astro, 404.astro
  components/     OakHero (canvas engine), Timeline, Nav, Grass
  content/        timeline/*.md, one file per career stop
  data/           resume.mjs, single source for the resume page and PDF
  layouts/        Base.astro, head, SEO, analytics
public/oak/       frame sequences + manifest.json
scripts/          frame extraction pipeline
resume-src/       PDF generator
og-src/           social card generator
```

## Content

**Timeline.** One markdown file per stop in `src/content/timeline/`, ordered by
`order` (1 is the crown, higher is further back in time). Typed with an Astro
content collection, so a malformed entry fails the build instead of the page.

**Resume.** Everything lives in [`src/data/resume.mjs`](src/data/resume.mjs).
The `/resume` page renders it, and CI regenerates `public/resume.pdf` from the
same object on every push, so the web and PDF versions cannot drift. Editing the
resume means editing one file.

## Develop

```bash
npm install
npm run dev
```

Other tasks:

```bash
npm run build              # static build to dist/
bash scripts/gen-frames.sh # re-extract oak frames from media-src/ (needs ffmpeg + Pillow)
node resume-src/build.mjs  # rebuild the resume PDF locally (CI does this on push)
bash og-src/build.sh       # regenerate the social card
```

Source videos live in `media-src/` and are gitignored: they are large, and the
extracted frames are what the site actually serves.

## Accessibility

Targets WCAG 2.2 AA. Skip link, landmarks, visible focus rings, labels that match
their visible text, 24px minimum target sizes, and text contrast held by opaque
panels rather than relying on whatever oak style loaded behind them. The canvas
and other decorative layers are `aria-hidden`. Every animation, the parallax, the
grain, the dice, the sprout, is disabled under `prefers-reduced-motion`.

## Deploy

Push to `main`. The workflow installs Chrome, rebuilds the resume PDF from
`resume.mjs`, builds the site, and publishes to GitHub Pages.
