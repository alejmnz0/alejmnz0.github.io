// Dev helper (run when the art or profile changes): renders public/og-image.png from the
// real city scene and the PNG icons from public/favicon.svg. Needs `npm run preview` running.
import { chromium } from '@playwright/test';
import fs from 'node:fs';

const browser = await chromium.launch();

// Open Graph / LinkedIn preview: 1200x630
const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
await ctx.addInitScript(() => sessionStorage.setItem('vice:intro-seen', '1'));
const page = await ctx.newPage();
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await page.addStyleTag({
  content: `[class*="wrap"] { height:630px !important; min-height:0 !important } header, [class*="hint"], [class*="hud"], [class*="root"] > button, .fx-scan { display:none !important }
  [class*="pinWrap"] { display:none }
  #og { position:fixed; inset:0; z-index:9999; display:flex; flex-direction:column; justify-content:flex-start; padding:64px 64px;
        background:linear-gradient(90deg, rgb(8 8 18 / .88) 0%, rgb(8 8 18 / .55) 48%, transparent 72%); }
  #og b { font: 900 84px/1 var(--f-display); letter-spacing:.01em; background:linear-gradient(180deg,#fff 0%,#ffe0f6 38%,#ff4fd8 55%,#ff8a4c 78%,#ffd36b 100%); -webkit-background-clip:text; color:transparent }
  #og b i { font-style:normal; color:#00e5ff; -webkit-text-fill-color:#00e5ff }
  #og span { margin-top:26px; font: 700 40px/1.1 var(--f-display); color:#f5f5fa }
  #og em { margin-top:14px; font: 700 20px var(--f-mono); letter-spacing:.32em; color:#00e5ff; font-style:normal }
  #og small { margin-top:22px; font: 30px var(--f-script); color:#ffd2f5; text-shadow:0 0 12px #ff4fd8 }`,
});
await page.evaluate(() => {
  const el = document.createElement('div');
  el.id = 'og';
  el.innerHTML = '<b>VICE<i>.</i>DEV</b><span>Alejandro Jiménez<br>Fernández</span><em>FULL STACK DEVELOPER</em><small>Software engineering meets the 80s.</small>';
  document.body.appendChild(el);
});
await page.waitForTimeout(400);
await page.screenshot({ type: 'jpeg', quality: 88, path: 'public/og-image.jpg', clip: { x: 0, y: 0, width: 1200, height: 630 } });
await ctx.close();

// Icons
const svg = fs.readFileSync('public/favicon.svg', 'utf8');
for (const [size, file] of [[32, 'favicon-32.png'], [180, 'apple-touch-icon.png'], [192, 'icon-192.png'], [512, 'icon-512.png']]) {
  const p = await browser.newPage({ viewport: { width: size, height: size } });
  await p.setContent(`<html><body style="margin:0;background:#080812">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`);
  await p.screenshot({ path: `public/${file}`, omitBackground: false });
  await p.close();
}
await browser.close();
console.log('images written');
