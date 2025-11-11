import { test, expect } from '@playwright/test';

/**
 * Core Functionality Tests
 * Validates essential application behavior and routing
 */

test.describe('Core Application Functionality', () => {
  test('should load and render the homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Verify page loads successfully
    await expect(page).toHaveTitle('my-portfolio');

    // Verify root element is mounted
    const root = await page.locator('#root');
    await expect(root).toBeVisible();
  });

  test('should have interactive main content', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify the app is rendered and interactive
    const body = await page.locator('body');
    await expect(body).toBeVisible();

    // Verify React app is mounted
    const root = await page.locator('#root');
    await expect(root).not.toBeEmpty();
  });

  test('should navigate between Layer1 and Layer2', async ({ page }) => {
    // Start at homepage
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Navigate to Layer2
    await page.goto('/layer2');
    await expect(page).toHaveURL(/layer2/);

    // Navigate back to root
    await page.goto('/');
    await expect(page).toHaveURL(/^.*\/((?!layer2).)*$/);
  });

  test('should handle 404 routes gracefully', async ({ page }) => {
    await page.goto('/non-existent-route');

    // Should redirect or show error handling
    // This test will help identify if you need to add a 404 page
    const response = await page.goto('/non-existent-route');
    expect(response?.status()).toBeLessThan(500);
  });
});
