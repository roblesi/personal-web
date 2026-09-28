import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One file per timeline stop, in src/content/timeline/. `order` 1 = crown (now),
// higher = further back in time (down toward the seed).
const timeline = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/timeline' }),
  schema: z.object({
    order: z.number(),
    kind: z.enum(['job', 'education']),
    title: z.string(),
    dateLabel: z.string(), // shown in the card, e.g. "Apr 2025 - now · Google · SF"
    sideLabel: z.string(), // shown opposite the card, e.g. "2025 - now"
    blurb: z.string(),
    tags: z.array(z.string()).default([]),
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
    // true when this role was a promotion from the role directly below it (same
    // company). Draws a "rise" connector on the spine linking the two cards.
    promotion: z.boolean().default(false),
  }),
});

// One file per project in src/content/projects/, ordered by `order` (1 first).
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    tagline: z.string(),
    blurb: z.string(),
    result: z.string().optional(), // a measured outcome, called out on the card
    tags: z.array(z.string()).default([]),
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
  }),
});

export const collections = { timeline, projects };

