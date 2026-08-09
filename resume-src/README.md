# Resume

The resume content lives in one place: [`src/data/resume.mjs`](../src/data/resume.mjs).
Both outputs read from it, so they never drift:

- **Web** — [`src/pages/resume.astro`](../src/pages/resume.astro) renders it at `/resume`.
- **PDF** — `build.mjs` renders it to `public/resume.pdf` (embedded Geist font,
  headless Chrome), which the `/resume` page links to as a download.

## Editing the resume

Just edit the content in [`src/data/resume.mjs`](../src/data/resume.mjs) and push.
The deploy workflow rebuilds `public/resume.pdf` from it on every push (see
[`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml)), so the PDF can
never fall out of sync. `public/resume.pdf` is gitignored and generated, not
committed.

## Building the PDF locally (optional)

Only needed to preview the PDF before pushing:

```bash
node resume-src/build.mjs
```

Uses macOS Chrome by default; set `CHROME_PATH` to override. CI sets it to the
runner's Chrome automatically.

## Note

This folder is not part of the Astro build (only `public/` and `src/pages` are
published), so it is never served or indexed on ignaciorobl.es.
