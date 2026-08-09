// @ts-check
import { defineConfig } from 'astro/config';

// Custom domain (ignaciorobl.es) serves at the root, so no `base` is needed.
export default defineConfig({
  site: 'https://ignaciorobl.es',
  build: { format: 'directory' },
});
