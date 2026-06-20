import { test, expect } from '@playwright/test';

test('contact form: fill and submit → success message appears', async ({ page }) => {
  // Mock emailjs in case env vars are set
  await page.route('https://api.emailjs.com/**', route =>
    route.fulfill({ status: 200, body: 'OK', contentType: 'text/plain' }),
  );

  await page.goto('/contact');
  await page.waitForSelector('[data-testid="contact-form"]');

  // Fill form
  await page.locator('#contact-name').fill('Test User');
  await page.locator('#contact-email').fill('test@example.com');
  await page.locator('#contact-message').fill('Hello, this is a test message.');

  // Submit
  await page.locator('[data-testid="contact-form"] button[type="submit"]').click();

  // Success message appears
  await expect(page.getByTestId('contact-success')).toBeVisible({ timeout: 5000 });
});

