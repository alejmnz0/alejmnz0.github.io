// Build step: render the one-page site to static HTML (SEO + instant first paint),
// then write 404.html, redirects for the old section URLs, sitemap.xml and robots.txt.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const entry = fs.readdirSync(ssrDir).find((f) => /^entry-server\.m?js$/.test(f));
const { render, site, profile, experience, education, social } = await import(pathToFileURL(path.join(ssrDir, entry)).href);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Preload the fonts visible in the first viewport.
const assets = fs.readdirSync(path.join(dist, 'assets'));
const preloads = ['big-shoulders-display-latin-wght-normal', 'tilt-neon-latin-', 'manrope-latin-wght-normal']
  .map((n) => assets.find((f) => f.startsWith(n) && f.endsWith('.woff2')))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`);

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.fullName,
  jobTitle: profile.role,
  description: profile.pitch,
  url: `${site.url}/`,
  email: `mailto:${social.find((s) => s.id === 'email').display}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Sevilla', addressCountry: 'ES' },
  sameAs: social.filter((s) => s.id !== 'email').map((s) => s.href),
  knowsAbout: profile.stackLine,
  knowsLanguage: ['es', 'en'],
  worksFor: experience.filter((e) => !e.end).map((e) => ({ '@type': 'Organization', name: e.company })),
  alumniOf: education.map((e) => ({ '@type': 'EducationalOrganization', name: e.school })),
};

const head = [
  `<title>${esc(site.title)}</title>`,
  `<meta name="description" content="${esc(site.description)}" />`,
  `<meta name="author" content="${esc(profile.fullName)}" />`,
  `<link rel="canonical" href="${site.url}/" />`,
  `<meta property="og:type" content="profile" />`,
  `<meta property="og:site_name" content="${site.name}" />`,
  `<meta property="og:locale" content="${site.locale}" />`,
  `<meta property="og:title" content="${esc(site.title)}" />`,
  `<meta property="og:description" content="${esc(site.description)}" />`,
  `<meta property="og:url" content="${site.url}/" />`,
  `<meta property="og:image" content="${site.ogImage}" />`,
  `<meta property="og:image:width" content="1200" />`,
  `<meta property="og:image:height" content="630" />`,
  `<meta property="og:image:alt" content="${esc(profile.fullName)} — ${esc(profile.role)}" />`,
  `<meta name="twitter:card" content="summary_large_image" />`,
  `<meta name="twitter:title" content="${esc(site.title)}" />`,
  `<meta name="twitter:description" content="${esc(site.description)}" />`,
  `<meta name="twitter:image" content="${site.ogImage}" />`,
  ...preloads,
  `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
].join('\n    ');

fs.writeFileSync(path.join(dist, 'index.html'), template.replace('<!--app-head-->', head).replace('<!--app-html-->', render()));
console.log('  prerendered index.html');

// Old multi-page URLs (/about/, /projects/…) now jump to their section.
const page = (title, body, extraHead = '') => `<!doctype html>
<html lang="es"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" /><title>${title}</title>${extraHead}
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0b0716;color:#f6eefc;font:18px/1.6 system-ui,sans-serif;text-align:center}a{color:#00e5ff}</style>
</head><body>${body}</body></html>`;

for (const id of ['about', 'experience', 'projects', 'skills', 'contact']) {
  const dir = path.join(dist, id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'index.html'),
    page('Redirigiendo…', `<p><a href="/#${id}">Ir a la sección</a></p>`, `<meta http-equiv="refresh" content="0; url=/#${id}" /><link rel="canonical" href="${site.url}/#${id}" />`),
  );
}

fs.writeFileSync(
  path.join(dist, '404.html'),
  page(`Página no encontrada — ${profile.fullName}`, `<main><p style="font-size:4rem;margin:0">🌴</p><h1>Wrong turn.</h1><p>Esta calle no existe.</p><p><a href="/">Volver al inicio</a></p></main>`),
);

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${site.url}/</loc><lastmod>${today}</lastmod></url>\n</urlset>\n`,
);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
fs.rmSync(ssrDir, { recursive: true, force: true });
console.log('  404.html, section redirects, sitemap.xml, robots.txt written');
