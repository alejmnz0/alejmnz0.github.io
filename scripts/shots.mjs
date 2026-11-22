// Dev helper: full-page screenshots of every route at the reference widths.
// Usage: node scripts/shots.mjs <outDir> [widths,comma,separated]   (needs `npm run preview` running)
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const out = process.argv[2] ?? 'shots';
const widths = (process.argv[3] ?? '320,375,768,1024,1366,1920').split(',').map(Number);
const routes = ['/', '/about/', '/experience/', '/projects/', '/skills/', '/contact/'];
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 768 ? 800 : 1000 }, reducedMotion: 'reduce' });
  await ctx.addInitScript(() => sessionStorage.setItem('vice:intro-seen', '1'));
  const page = await ctx.newPage();
  for (const r of routes) {
    await page.goto(`http://localhost:4173${r}`, { waitUntil: 'networkidle' });
    const name = `${w}-${r === '/' ? 'home' : r.replaceAll('/', '')}.png`;
    await page.screenshot({ path: path.join(out, name), fullPage: true });
  }
  await ctx.close();
}
await browser.close();
console.log('done', out);
