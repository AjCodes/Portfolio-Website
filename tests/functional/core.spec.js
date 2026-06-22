import { test, expect } from '@playwright/test';

const waitForIntro = async (page) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  await expect(page.getByRole('heading', { name: /building digital experiences people remember/i })).toBeVisible();
};

const scrollToSection = async (page, testId) => {
  await page.getByTestId(testId).scrollIntoViewIfNeeded();
  await expect(page.getByTestId(testId)).toBeInViewport();
};

test.describe('FutureFolio portfolio visitor journeys', () => {
  test('main user journey from homepage to projects and about', async ({ page, context }) => {
    const externalProject = context.waitForEvent('page').catch(() => null);

    await waitForIntro(page);

    await expect(page.getByTestId('hero-work-cta')).toBeVisible();
    await page.getByTestId('hero-work-cta').click();

    await expect(page.getByRole('heading', { name: /selected work/i })).toBeVisible();
    await expect(page.getByTestId('project-card')).toContainText(/smart roads/i);

    const projectLink = page.getByTestId('project-link').first();
    await expect(projectLink).toBeVisible();
    await projectLink.click();

    const openedPage = await externalProject;
    if (openedPage) {
      await openedPage.close();
    }

    await page.getByRole('link', { name: /about me/i }).first().click();
    await expect(page.getByTestId('about-section')).toBeInViewport();
    await expect(page.getByText(/i build things/i)).toBeVisible();
    await expect(page.getByTestId('tech-stack')).toContainText(/react/i);
    await expect(page.getByTestId('contact-section')).toContainText(/available for work/i);
  });

  test('glance, scan, read content is easy to find', async ({ page }) => {
    await waitForIntro(page);

    await expect(page.getByRole('heading', { name: /building digital experiences people remember/i })).toBeVisible();
    await expect(page.getByTestId('hero-work-cta')).toBeVisible();
    await expect(page.getByRole('navigation', { name: /primary/i }).first()).toBeVisible();

    await scrollToSection(page, 'projects-section');
    await expect(page.getByRole('heading', { name: /selected work/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /smart roads/i })).toBeVisible();

    await scrollToSection(page, 'about-section');
    await expect(page.getByText(/i build things/i)).toBeVisible();
  });

  test('Spotify failure still leaves the portfolio usable', async ({ page }) => {
    await page.route('**/api/spotify/track', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Spotify unavailable during test' }),
      });
    });

    await waitForIntro(page);
    await scrollToSection(page, 'about-section');

    await expect(page.getByTestId('spotify-widget')).toBeVisible();
    await expect(page.getByTestId('spotify-widget')).toContainText(/recently played|spotify|unavailable/i);
    await expect(page.getByTestId('contact-section')).toBeVisible();
  });

  test('mobile visitor can reach the key portfolio content', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await waitForIntro(page);

    await expect(page.getByRole('heading', { name: /building digital experiences people remember/i })).toBeVisible();
    await expect(page.getByRole('navigation', { name: /primary mobile/i })).toBeVisible();

    await page.getByRole('link', { name: /projects/i }).click();
    await expect(page.getByRole('heading', { name: /selected work/i })).toBeVisible();
    await expect(page.getByTestId('project-card')).toContainText(/smart roads/i);

    await page.getByRole('navigation', { name: /primary mobile/i }).getByRole('link', { name: /about me/i }).click();
    await expect(page.getByTestId('about-section')).toBeInViewport();
    await expect(page.getByTestId('contact-section')).toBeVisible();
    await expect(page.getByTestId('tech-stack')).toContainText(/javascript|react/i);
  });

  test('handles invalid routes gracefully', async ({ page }) => {
    const response = await page.goto('/some-page-that-doesnt-exist');
    expect(response?.status()).toBeLessThan(500);
  });
});
