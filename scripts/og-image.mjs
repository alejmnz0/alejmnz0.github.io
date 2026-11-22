// Dev helper: renders public/og-image.jpg (1200x630) from the real hero.
// Run with `npm run preview` active:  node scripts/og-image.mjs
import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await page.addStyleTag({
  content: `nav, [class*="scroll"], [class*="ctas"], [class*="tagline"], [class*="hello"] { display:none !important }
  header[id="top"] { min-height: 630px !important; padding: 40px 0 120px !important }
  h1 { font-size: 118px !important }`,
});
await page.waitForTimeout(4000);
await page.screenshot({ path: 'public/og-image.jpg', type: 'jpeg', quality: 88 });
await browser.close();
console.log('public/og-image.jpg written');
