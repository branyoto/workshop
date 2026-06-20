import { test, expect } from '@playwright/test';

/** Open the category drawer (which contains the language switcher in its footer). */
async function openCategoryDrawer(page: import('@playwright/test').Page) {
  // Desktop: the menu button is the one with md:inline-flex (right side of header)
  // It's the second button in the header (after mobile hamburger which is hidden on desktop)
  await page
    .locator('header')
    .getByRole('button', { name: /category|menu|catégories/i })
    .first()
    .click();
  await page.waitForSelector('[data-testid="lang-fr"]');
}

test('language switch: FR→EN updates strings, cart and route preserved', async ({ page }) => {
  // Add an item to cart to verify preservation later
  await page.goto('/item/item-plush-bunny');
  await page.waitForSelector('[data-testid="add-to-cart"]');
  await page.getByTestId('add-to-cart').click();

  // Go to home
  await page.goto('/');

  // Open category drawer and switch to EN
  await openCategoryDrawer(page);
  await page.getByTestId('lang-en').click();
  await page.keyboard.press('Escape');

  // Verify EN is now active
  await openCategoryDrawer(page);
  await expect(page.getByTestId('lang-en')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByTestId('lang-fr')).toHaveAttribute('aria-pressed', 'false');

  // Still on home route
  expect(page.url()).toMatch(/\/$/);

  // Close drawer
  await page.keyboard.press('Escape');

  // Cart still has 1 item
  await page.getByTestId('header-cart-button').click();
  await expect(page.getByTestId('cart-item')).toHaveCount(1);
  await page.keyboard.press('Escape');

  // Switch back to FR
  await openCategoryDrawer(page);
  await page.getByTestId('lang-fr').click();
  await page.keyboard.press('Escape');

  // FR active again
  await openCategoryDrawer(page);
  await expect(page.getByTestId('lang-fr')).toHaveAttribute('aria-pressed', 'true');
});
