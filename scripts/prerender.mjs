// Build step: turn the SPA into static HTML per route (SEO + instant first paint),
// then generate sitemap.xml, robots.txt and 404.html. Runs after `vite build` + SSR build.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const entry = fs.readdirSync(ssrDir).find((f) => /^entry-server\.(m?js)$/.test(f));
const { render, routeMeta, site, profile, experience, education, social } = await import(pathToFileURL(path.join(ssrDir, entry)).href);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Preload the two variable fonts used above the fold.
const assets = fs.readdirSync(path.join(dist, 'assets'));
const preloads = ['unbounded-latin-wght-normal', 'manrope-latin-wght-normal']
  .map((n) => assets.find((f) => f.startsWith(n) && f.endsWith('.woff2')))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ');

const email = social.find((s) => s.id === 'email').display;
const sameAs = social.filter((s) => s.id !== 'email').map((s) => s.href);
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: profile.fullName,
      jobTitle: profile.role,
      description: profile.pitch,
      url: `${site.url}/`,
      email: `mailto:${email}`,
      address: { '@type': 'PostalAddress', addressLocality: 'Sevilla', addressCountry: 'ES' },
      sameAs,
      knowsAbout: profile.stackLine,
      knowsLanguage: ['es', 'en'],
      worksFor: experience.filter((e) => !e.end).map((e) => ({ '@type': 'Organization', name: e.company })),
      alumniOf: education.map((e) => ({ '@type': 'EducationalOrganization', name: e.school })),
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: `${site.url}/`,
      name: site.name,
      inLanguage: 'es',
      author: { '@id': `${site.url}/#person` },
    },
  ],
};

function head(meta, { noindex = false } = {}) {
  const url = `${site.url}${meta.path}`;
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="author" content="${esc(profile.fullName)}" />`,
    noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${meta.path === '/' ? 'profile' : 'website'}" />`,
    `<meta property="og:site_name" content="${site.name}" />`,
    `<meta property="og:locale" content="${site.locale}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${site.ogImage}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="VICE.DEV — ${esc(profile.fullName)}, ${esc(profile.role)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${site.ogImage}" />`,
    preloads,
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ');
}

function write(file, html) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log('  prerendered', path.relative(dist, file));
}

for (const meta of routeMeta) {
  const url = meta.path === '/' ? '/' : meta.path.replace(/\/$/, '');
  const html = template.replace('<!--app-head-->', head(meta)).replace('<!--app-html-->', render(url));
  write(path.join(dist, meta.path, 'index.html'), html);
}

// 404 page (GitHub Pages serves it for unknown paths; the client router then renders NotFound)
const notFound = { path: '/404', title: `Página no encontrada — ${site.name}`, description: site.defaultDescription };
write(path.join(dist, '404.html'), template.replace('<!--app-head-->', head(notFound, { noindex: true })).replace('<!--app-html-->', render('/404')));

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routeMeta
    .map((r) => `  <url><loc>${site.url}${r.path}</loc><lastmod>${today}</lastmod><priority>${r.path === '/' ? '1.0' : '0.8'}</priority></url>`)
    .join('\n')}\n</urlset>\n`,
);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
fs.rmSync(ssrDir, { recursive: true, force: true });
console.log('  sitemap.xml, robots.txt, 404.html written');
