# Resume source

Editable source for the resume served at `/resume.pdf`.

- `resume.html` — the resume markup and styling. Keeps a `__GEIST_B64__`
  placeholder; the Geist font is embedded at build time so the PDF is
  self-contained.
- `build.sh` — injects the font and renders `resume.html` to
  `../public/resume.pdf` using headless Chrome.

## Rebuild

```bash
bash resume-src/build.sh
```

Then commit the regenerated `public/resume.pdf`.

## Note

This folder is not part of the site build (Astro only publishes `public/` and
`src/pages`), so the source is never served or indexed on ignaciorobl.es. The
generated `public/resume.pdf` is the only thing published.
