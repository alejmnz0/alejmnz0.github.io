import { expect, test } from '@playwright/test';

test.describe('one-page site', () => {
  test('hero shows name, role and both CTAs', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: 'Alejandro Jiménez Fernández' })).toBeVisible();
    await expect(page.getByText('Full Stack Developer', { exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Ver proyectos' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Descargar CV' }).first()).toBeVisible();
  });

  test('all sections exist in order', async ({ page }) => {
    await page.goto('/');
    const ids = await page.locator('main section[id]').evaluateAll((els) => els.map((e) => e.id));
    expect(ids).toEqual(['about', 'experience', 'projects', 'skills', 'contact']);
  });

  test('desktop nav scrolls to a section and marks it active', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.goto('/');
    await page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: /Projects/ }).click();
    await expect(page).toHaveURL(/#projects$/);
    await expect(page.getByRole('heading', { name: 'Projects' })).toBeInViewport();
    await expect(page.getByRole('link', { name: /Projects/ }).first()).toHaveAttribute('aria-current', 'true');
  });

  test('mobile menu opens, jumps and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/');
    await page.getByRole('button', { name: 'Abrir menú' }).click();
    await page.getByRole('link', { name: /Contact/ }).click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.getByRole('button', { name: 'Abrir menú' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '¿Hablamos?' })).toBeInViewport();
  });

  test('content revealed on scroll ends up visible', async ({ page }) => {
    await page.goto('/');
    const title = page.getByRole('heading', { name: 'Skills' });
    await title.scrollIntoViewIfNeeded();
    await expect(title).toHaveAttribute('data-in');
    await expect(page.locator('#skills').getByText('NestJS', { exact: true })).toBeVisible();
  });

  test('every project links to its real repository', async ({ page }) => {
    await page.goto('/');
    const hrefs = await page.locator('#projects a[target="_blank"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    expect(hrefs.length).toBeGreaterThanOrEqual(6);
    for (const h of hrefs) expect(h).toMatch(/^https:\/\/github\.com\/alejmnz0\/[\w.-]+$/);
  });

  test('CV is downloadable and is a PDF', async ({ page, request }) => {
    await page.goto('/');
    const href = await page.getByRole('link', { name: 'Descargar CV' }).first().getAttribute('href');
    const res = await request.get(href!);
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('pdf');
  });

  test('copy email button', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/#contact');
    await page.getByRole('button', { name: 'Copiar email' }).click();
    await expect(page.getByRole('button', { name: 'Copiado' })).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('desarrolladorjimenez@gmail.com');
  });

  test('external links are safe', async ({ page }) => {
    await page.goto('/');
    const links = page.locator('a[target="_blank"]');
    for (let i = 0; i < (await links.count()); i++) await expect(links.nth(i)).toHaveAttribute('rel', /noopener/);
  });

  test('old section URLs redirect to their anchor', async ({ page }) => {
    await page.goto('/experience/');
    await expect(page).toHaveURL(/\/#experience$/);
  });

  test('SEO essentials are in the static HTML', async ({ request }) => {
    const html = await (await request.get('/')).text();
    for (const s of ['<title>', 'og:image', 'application/ld+json', 'Ayesa', 'Gestor de Horas', 'desarrolladorjimenez@gmail.com']) expect(html).toContain(s);
    expect((await request.get('/sitemap.xml')).status()).toBe(200);
    expect((await request.get('/robots.txt')).status()).toBe(200);
    expect((await request.get('/og-image.jpg')).status()).toBe(200);
  });
});
