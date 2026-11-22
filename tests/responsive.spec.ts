import { expect, test } from '@playwright/test';

const WIDTHS = [320, 375, 390, 430, 768, 1024, 1366, 1920, 2560];

for (const width of WIDTHS) {
  test(`${width}px: no overflow, no errors, all content reachable`, async ({ page }) => {
    const problems: string[] = [];
    page.on('console', (m) => m.type() === 'error' && problems.push(m.text()));
    page.on('pageerror', (e) => problems.push(e.message));
    page.on('response', (r) => r.url().startsWith('http://localhost:4173') && r.status() >= 400 && problems.push(`${r.status()} ${r.url()}`));

    await page.setViewportSize({ width, height: width < 768 ? 800 : 1000 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // scroll through the whole page so every reveal fires
    const height = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < height; y += 500) await page.mouse.wheel(0, 500);
    await page.waitForTimeout(1200);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, 'horizontal overflow in px').toBeLessThanOrEqual(0);

    // nothing left invisible after scrolling past it
    const hidden = await page.evaluate(() =>
      [...document.querySelectorAll('[data-reveal]')].filter((e) => getComputedStyle(e).opacity !== '1').length,
    );
    expect(hidden).toBe(0);

    const broken = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src));
    expect(broken).toEqual([]);

    const nav = width > 900 ? page.getByRole('link', { name: /About/ }).first() : page.getByRole('button', { name: 'Abrir menú' });
    await expect(nav).toBeVisible();
    expect(problems).toEqual([]);
  });
}
