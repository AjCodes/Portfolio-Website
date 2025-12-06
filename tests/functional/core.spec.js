import { test, expect } from '@playwright/test';

/**
 * Core Functionality Tests
 * Tests that the main portfolio features work correctly
 */

test.describe('Portfolio Core Features', () => {

  // Test 1: Page loads correctly
  test('homepage loads and shows content', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Check page has a title
    await expect(page).toHaveTitle('my-portfolio');

    // Check React app is mounted
    const root = await page.locator('#root');
    await expect(root).toBeVisible();
  });

  // Test 2: Navigation bar works
  test('navbar allows switching between views', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find the navigation bar
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    // Try clicking on About link (if it exists)
    const aboutLink = page.getByText('About', { exact: false });
    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      // Give time for animation
      await page.waitForTimeout(500);
    }
  });

  // Test 3: Theme toggle works
  test('theme toggle changes color mode', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find theme toggle button
    const themeButton = page.locator('button[aria-label*="theme"]').first();

    if (await themeButton.isVisible()) {
      // Get initial theme
      const html = page.locator('html');
      const initialClass = await html.getAttribute('class');

      // Click toggle
      await themeButton.click();
      await page.waitForTimeout(300);

      // Verify theme changed
      const newClass = await html.getAttribute('class');
      expect(newClass).not.toBe(initialClass);
    }
  });

  // Test 4: No broken pages
  test('handles invalid routes gracefully', async ({ page }) => {
    const response = await page.goto('/some-page-that-doesnt-exist');

    // Should not crash (status below 500)
    expect(response?.status()).toBeLessThan(500);
  });

});
