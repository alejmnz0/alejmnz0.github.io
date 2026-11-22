import { expect, test } from '@playwright/test';

test.describe('intro', () => {
  test('plays once per session, can be skipped, never on deep links', async ({ page }) => {
    await page.goto('/');
    const intro = page.getByRole('dialog', { name: /VICE\.DEV/i });
    await expect(intro).toBeVisible();
    await page.getByRole('button', { name: 'Saltar intro' }).click();
    await expect(intro).toBeHidden();

    await page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: 'About' }).click();
    await page.getByRole('link', { name: /Map/ }).first().click();
    await expect(intro).toBeHidden();
    await page.reload();
    await expect(intro).toBeHidden();
  });

  test('ENTER THE CITY reveals the map', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.goto('/');
    await page.getByRole('button', { name: 'Enter the city' }).click();
    await expect(page.getByRole('link', { name: /02 Downtown/ })).toBeVisible();
  });

  test('deep link skips the intro', async ({ page }) => {
    await page.goto('/experience/');
    await expect(page.getByRole('heading', { level: 1, name: 'Experience' })).toBeVisible();
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });
});

test.describe('site', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => sessionStorage.setItem('vice:intro-seen', '1'));
  });

  test('city map buildings navigate to their sections', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.getByRole('link', { name: /03 Software Garage/ }).click();
    await expect(page).toHaveURL(/\/projects/);
    await expect(page.getByRole('heading', { level: 1, name: 'Projects' })).toBeVisible();
  });

  test('keyboard can reach and open a building', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const target = page.getByRole('link', { name: /05 Night Club/ });
    await target.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/contact/);
  });

  test('mobile menu opens, navigates and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/');
    await page.getByRole('button', { name: 'Abrir menú' }).click();
    await page.getByRole('navigation', { name: 'Menú móvil' }).getByRole('link', { name: /Skills/ }).click();
    await expect(page).toHaveURL(/\/skills/);
    await expect(page.getByRole('navigation', { name: 'Menú móvil' })).toBeHidden();
  });

  test('every section has a way back to the map', async ({ page }) => {
    for (const r of ['/about/', '/experience/', '/projects/', '/skills/', '/contact/']) {
      await page.goto(r);
      await expect(page.getByRole('link', { name: 'Volver al mapa', exact: true })).toBeVisible();
    }
  });

  test('CV is downloadable and is a PDF', async ({ page, request }) => {
    await page.goto('/about/');
    const href = await page.getByRole('link', { name: 'Descargar CV' }).first().getAttribute('href');
    const res = await request.get(href!);
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('pdf');
  });

  test('project filters and spec sheet', async ({ page }) => {
    await page.goto('/projects/');
    await page.getByRole('group', { name: 'Filtrar por categoría' }).getByRole('button', { name: 'Desktop' }).click();
    await expect(page.getByText('1 proyecto en el garaje')).toBeVisible();
    await page.getByRole('link', { name: /Gestor de Horas.*Ver ficha/ }).click();
    const dialog = page.getByRole('dialog', { name: 'Gestor de Horas' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('link', { name: 'Ver repositorio' })).toHaveAttribute('href', 'https://github.com/alejmnz0/GestorHoras');
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });

  test('project deep link opens its sheet', async ({ page }) => {
    await page.goto('/projects/#grades-docker');
    await expect(page.getByRole('dialog', { name: 'GradesDocker' })).toBeVisible();
  });

  test('skills show real evidence, not percentages', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.goto('/skills/');
    await page.getByRole('button', { name: 'NestJS' }).click();
    await expect(page.getByRole('link', { name: /Ayesa/ })).toBeVisible();
    await expect(page.locator('body')).not.toContainText('%');
  });

  test('copy email button', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/contact/');
    await page.getByRole('button', { name: 'Copiar email' }).click();
    await expect(page.getByRole('button', { name: 'Copiado' })).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('desarrolladorjimenez@gmail.com');
  });

  test('external links are safe and point to the real profiles', async ({ page }) => {
    await page.goto('/contact/');
    const links = page.locator('a[target="_blank"]');
    const n = await links.count();
    expect(n).toBeGreaterThan(0);
    for (let i = 0; i < n; i++) {
      const a = links.nth(i);
      await expect(a).toHaveAttribute('rel', /noopener/);
      expect(await a.getAttribute('href')).toMatch(/^https:\/\/(github\.com\/alejmnz0|www\.linkedin\.com\/in\/)/);
    }
  });

  test('radio is silent until the user presses play', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Abrir Vice Radio' }).click();
    await expect(page.getByRole('button', { name: 'Reproducir' })).toBeVisible();
    expect(await page.evaluate(() => document.querySelectorAll('audio').length)).toBe(0);
    await page.getByRole('button', { name: 'Reproducir' }).click();
    await expect(page.getByRole('button', { name: 'Pausar' })).toBeVisible();
    await page.getByRole('button', { name: 'Pausar' }).click();
  });

  test('hidden terminal answers commands', async ({ page }) => {
    await page.goto('/about/');
    await page.keyboard.press('`');
    const term = page.getByRole('dialog', { name: 'Terminal secreta' });
    await expect(term).toBeVisible();
    await page.keyboard.type('whoami');
    await page.keyboard.press('Enter');
    await expect(term).toContainText('Alejandro Jiménez Fernández');
    await page.keyboard.press('Escape');
    await expect(term).toBeHidden();
  });

  test('unknown routes show the 404 page', async ({ page }) => {
    // GitHub Pages answers 404 with dist/404.html; vite preview falls back to 200, so only the content is asserted.
    await page.goto('/no-existe');
    await expect(page.getByRole('heading', { name: 'Wrong turn.' })).toBeVisible();
  });

  test('SEO essentials are in the static HTML', async ({ request }) => {
    for (const r of ['/', '/experience/', '/projects/']) {
      const html = await (await request.get(r)).text();
      expect(html).toContain('<title>');
      expect(html).toContain('og:image');
      expect(html).toContain('application/ld+json');
      expect(html).toContain('Alejandro Jiménez Fernández');
    }
    expect((await request.get('/sitemap.xml')).status()).toBe(200);
    expect((await request.get('/robots.txt')).status()).toBe(200);
    expect((await request.get('/og-image.jpg')).status()).toBe(200);
  });
});
