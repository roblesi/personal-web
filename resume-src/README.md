# Resume

The resume content lives in one place: [`src/data/resume.mjs`](../src/data/resume.mjs).
Both outputs read from it, so they never drift:

- **Web** — [`src/pages/resume.astro`](../src/pages/resume.astro) renders it at `/resume`.
- **PDF** — `build.mjs` renders it to `../public/resume.pdf` (embedded Geist font,
  headless Chrome), which the `/resume` page links to as a download.

## Edit the resume

1. Change the content in `src/data/resume.mjs`.
2. Rebuild the PDF:

   ```bash
   node resume-src/build.mjs
   ```

3. Commit `src/data/resume.mjs` and the regenerated `public/resume.pdf`.

## Note

This folder is not part of the Astro build (only `public/` and `src/pages` are
published), so it is never served or indexed on ignaciorobl.es. Only the
generated `public/resume.pdf` and the `/resume` page ship.
