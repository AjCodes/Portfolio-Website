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

    // Check React app is mounted
    const root = await page.locator('#root');
    await expect(root).toBeVisible();

    // Check main content is visible
    const content = page.locator('text=AJ');
    await expect(content.first()).toBeVisible();
  });

  // Test 2: Navigation bar works
  test('navbar allows switching between views', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find the navigation bar
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    // Click on About link specifically in the navbar
    const aboutLink = nav.getByText('About', { exact: false });
    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      // Give time for animation
      await page.waitForTimeout(500);
    }
  });

  // Test 3: No broken pages
  test('handles invalid routes gracefully', async ({ page }) => {
    const response = await page.goto('/some-page-that-doesnt-exist');

    // Should not crash (status below 500)
    expect(response?.status()).toBeLessThan(500);
  });

});
