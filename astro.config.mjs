// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Custom domain (ignaciorobl.es) serves at the root, so no `base` is needed.
export default defineConfig({
  site: 'https://ignaciorobl.es',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
