// Build the downloadable resume PDF (../public/resume.pdf) from the shared
// content in ../src/data/resume.mjs, so the PDF and the /resume web page never
// drift. The Geist font is embedded so the PDF is self-contained. Rendered with
// headless Chrome.
//
// This folder is not part of the Astro build output (only public/ and src/pages
// are published), so this source is never served or indexed on the site.
//
// Usage:  node resume-src/build.mjs
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resume as r } from '../src/data/resume.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const FONT = join(here, '../public/fonts/geist.woff2');
const OUT = join(here, '../public/resume.pdf');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const b64 = readFileSync(FONT).toString('base64');

const role = (j) => `
  <div class="role">
    <div class="role-head">
      <div class="role-title">${esc(j.title)}, <span class="org">${esc(j.org)}</span></div>
      <div class="role-dates">${esc(j.dates)}</div>
    </div>
    <div class="role-sub">${esc(j.location)}</div>
    <ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
  </div>`;

const html = `<meta charset="utf-8">
<style>
  @font-face{font-family:"Geist";font-weight:300 700;font-style:normal;src:url("data:font/woff2;base64,${b64}") format("woff2")}
  @page{size:Letter;margin:0.55in 0.6in}
  *{box-sizing:border-box;margin:0;padding:0}
  :root{--ink:#1a1c1a;--muted:#4b514b;--green:#17301f;--gold:#9a8748}
  html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  body{font-family:"Geist",Arial,sans-serif;color:var(--ink);font-size:10.3px;line-height:1.42}
  header{border-bottom:2px solid var(--green);padding-bottom:9px;margin-bottom:12px}
  .name{font-size:27px;font-weight:600;letter-spacing:-.01em;color:var(--green);line-height:1}
  .tagline{margin-top:4px;font-size:10.5px;color:var(--muted);letter-spacing:.02em}
  .contact{margin-top:8px;font-size:9.7px;color:var(--muted);display:flex;flex-wrap:wrap;gap:5px 12px}
  .contact b{font-weight:600;color:var(--ink)}
  section{margin-top:13px}
  h2{font-size:10.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--green);
     border-bottom:1px solid var(--gold);padding-bottom:3px;margin-bottom:7px}
  p.summary{font-size:10.6px;line-height:1.5;color:var(--ink)}
  .skills{display:grid;grid-template-columns:auto 1fr;gap:3px 12px}
  .skills dt{font-weight:600;color:var(--green);white-space:nowrap}
  .skills dd{color:var(--ink)}
  .role{margin-bottom:9px}
  .role:last-child{margin-bottom:2px}
  .role-head{display:flex;justify-content:space-between;align-items:baseline;gap:12px}
  .role-title{font-weight:600;font-size:11px;color:var(--ink)}
  .role-title .org{color:var(--green)}
  .role-dates{font-size:9.4px;color:var(--muted);white-space:nowrap;font-variant-numeric:tabular-nums}
  .role-sub{font-size:9.4px;color:var(--muted);margin-top:1px}
  ul{list-style:none;margin-top:4px}
  li{position:relative;padding-left:12px;margin-bottom:2px;line-height:1.4}
  li::before{content:"";position:absolute;left:2px;top:6px;width:3px;height:3px;border-radius:50%;background:var(--gold)}
  .refs{font-size:9.6px;line-height:1.45}
  .refs .item{margin-bottom:4px}
  .refs i,.summary-note i,p.summary i{font-style:italic;color:var(--muted)}
  .two{display:grid;grid-template-columns:1fr 1fr;gap:0 26px}
  .edu .deg{font-weight:600;color:var(--ink)}
  .edu .meta{font-size:9.4px;color:var(--muted)}
  .edu .item{margin-bottom:6px}
  p.patents i{font-style:italic}
</style>

<header>
  <div class="name">${esc(r.name)}</div>
  <div class="tagline">${esc(r.tagline)}</div>
  <div class="contact">
    <span>${esc(r.location)}</span>
    <span><b>Phone</b> ${esc(r.contact.phone)}</span>
    <span><b>Email</b> ${esc(r.contact.email)}</span>
    <span><b>Web</b> ${esc(r.contact.web)}</span>
    <span><b>GitHub</b> ${esc(r.contact.github)}</span>
    <span><b>LinkedIn</b> ${esc(r.contact.linkedin)}</span>
  </div>
</header>

<section>
  <h2>Summary</h2>
  <p class="summary">${esc(r.summary)}</p>
</section>

<section>
  <h2>Skills</h2>
  <dl class="skills">
    ${r.skills.map((s) => `<dt>${esc(s.label)}</dt><dd>${esc(s.items)}</dd>`).join('\n    ')}
  </dl>
</section>

<section>
  <h2>Experience</h2>
  ${r.experience.map(role).join('\n  ')}
</section>

<section>
  <h2>Patents</h2>
  <p class="patents">${esc(r.patents.lead)} <i>${esc(r.patents.title)}</i> ${esc(r.patents.tail)}</p>
</section>

<section>
  <h2>Publications</h2>
  <div class="refs">
    ${r.publications.map((p) => `<div class="item">${esc(p.cite)} <i>${esc(p.title)}</i> ${esc(p.venue)}</div>`).join('\n    ')}
  </div>
</section>

<section class="edu">
  <h2>Education</h2>
  <div class="two">
    <div>
      ${r.education.slice(0, 2).map((e) => `<div class="item"><div class="deg">${esc(e.degree)}</div><div class="meta">${esc(e.meta)}</div></div>`).join('\n      ')}
    </div>
    <div>
      ${r.education.slice(2).map((e) => `<div class="item"><div class="deg">${esc(e.degree)}</div><div class="meta">${esc(e.meta)}</div></div>`).join('\n      ')}
    </div>
  </div>
</section>
`;

const tmp = join(tmpdir(), `resume-${process.pid}.html`);
writeFileSync(tmp, html);
try {
  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
    '--run-all-compositor-stages-before-draw', '--virtual-time-budget=3000',
    `--print-to-pdf=${OUT}`, `file://${tmp}`,
  ], { stdio: 'ignore' });
  console.log(`Built ${OUT}`);
} finally {
  unlinkSync(tmp);
}
