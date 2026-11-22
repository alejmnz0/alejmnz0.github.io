import { expect, test, type Page } from '@playwright/test';

const ROUTES = ['/', '/about/', '/experience/', '/projects/', '/skills/', '/contact/'];
const WIDTHS = [320, 375, 390, 430, 768, 1024, 1366, 1920, 2560];
const heightFor = (w: number) => (w < 768 ? 800 : w < 1366 ? 1024 : w < 2560 ? 1080 : 1440);

/** Fails the test on any console error or failed same-origin request. */
function watch(page: Page) {
  const problems: string[] = [];
  page.on('console', (m) => m.type() === 'error' && problems.push(`console: ${m.text()}`));
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
  page.on('response', (r) => {
    if (r.url().startsWith('http://localhost:4173') && r.status() >= 400) problems.push(`${r.status()} ${r.url()}`);
  });
  return problems;
}

test.beforeEach(async ({ page }) => {
  // the intro is covered by its own spec; skip it here
  await page.addInitScript(() => sessionStorage.setItem('vice:intro-seen', '1'));
});

for (const width of WIDTHS) {
  test.describe(`${width}px`, () => {
    test.use({ viewport: { width, height: heightFor(width) } });

    for (const route of ROUTES) {
      test(`${route} renders without overflow or errors`, async ({ page }) => {
        const problems = watch(page);
        await page.goto(route);
        await page.waitForLoadState('networkidle');

        await expect(page.locator('h1').first()).toBeAttached();
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow, 'horizontal overflow in px').toBeLessThanOrEqual(0);

        // every visible <img> actually loaded
        const broken = await page.evaluate(() =>
          [...document.images].filter((i) => i.checkVisibility() && i.complete && i.naturalWidth === 0).map((i) => i.src),
        );
        expect(broken).toEqual([]);

        // navigation is reachable at every size
        const nav = width >= 1024 ? page.getByRole('navigation', { name: 'Principal' }) : page.getByRole('button', { name: 'Abrir menú' });
        await expect(nav).toBeVisible();

        expect(problems).toEqual([]);
      });
    }
  });
}
