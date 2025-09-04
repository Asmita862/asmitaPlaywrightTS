import { Page, expect } from '@playwright/test';

/**
 * Logs into the Bahah CMS application.
 * @param page Playwright Page object
 * @param email User email
 * @param password User password
 */
export async function login(page: Page, email: string, password: string) {
  await page.goto('https://stage-cms.bahah.com.au/login', { timeout: 100000 });

  // Fill email and password
  await page.fill('#outlined-adornment-email-login', email);
  await page.fill('#outlined-adornment-password-login', password);

  // Click login button
  await page.click('button[type="submit"]');

  // Wait for dashboard heading to appear
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
}

/**
 * Logs out from the Bahah CMS application.
 * @param page Playwright Page object
 */
export async function logout(page: Page) {
  // Click on the dropdown menu icon (avatar)
  await page.click("//*[name()='path' and contains(@d,'M12 12c2.2')]");

  // Click Logout
  await page.click("//p[normalize-space()='Logout']");

  // Wait for login page button to appear
  await page.waitForSelector('button[type="submit"]', { timeout: 10000 });
}
