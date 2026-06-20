import { test, expect } from '@playwright/test';

test('full order journey: home → catalogue → item → cart → checkout → confirmation → empty cart', async ({ page }) => {
  // Mock emailjs API (any URL pattern)
  await page.route('**emailjs.com**', (route) => route.fulfill({ status: 200, body: 'OK', contentType: 'text/plain' }));

  // Navigate directly to a known available item
  await page.goto('/item/item-plush-bunny');
  await page.waitForSelector('[data-testid="add-to-cart"]');

  // Add to cart
  await page.getByTestId('add-to-cart').click();

  // Open cart drawer
  await page.getByTestId('header-cart-button').click();
  await expect(page.getByTestId('cart-drawer')).toBeVisible();
  await expect(page.getByTestId('cart-item')).toHaveCount(1);

  // Go to checkout via drawer link
  await page.getByTestId('cart-checkout-link').click();
  await expect(page.getByTestId('checkout-form')).toBeVisible();

  // Fill form (name + email + address required; email OR phone required by refine)
  await page.getByTestId('checkout-name').fill('Test User');
  await page.getByTestId('checkout-email').fill('test@example.com');
  // Address is a textarea with id="address"
  await page.locator('textarea#address').fill('1 rue de la Paix, 75001 Paris');

  // Wait a tick for validation to settle
  await page.waitForTimeout(200);

  // Submit
  await page.getByTestId('checkout-submit').click();

  // Confirmation screen shows order number (allow time for async submit)
  await expect(page.getByTestId('order-confirmation')).toBeVisible({ timeout: 10000 });
  const orderText = await page.getByTestId('order-number').textContent();
  expect(orderText?.trim().length).toBeGreaterThan(0);

  // Cart is empty: go to catalog and open cart
  await page.goto('/catalog');
  await page.getByTestId('header-cart-button').click();
  await expect(page.getByTestId('cart-item')).toHaveCount(0);
});
