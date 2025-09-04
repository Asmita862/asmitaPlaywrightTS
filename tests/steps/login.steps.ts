import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

Given('the user is on the Login page', async function (this: CustomWorld) {
  await this.init();
  await this.page.goto('https://stage-cms.bahah.com.au/login');
});

When('the user enters email {string}', async function (this: CustomWorld, email: string) {
  await this.loginPage.enterEmail(email);
});

When('the user enters password {string}', async function (this: CustomWorld, password: string) {
  await this.loginPage.enterPassword(password);
});

When('the user clicks on {string}', async function (this: CustomWorld, button: string) {
  if (button === 'Sign in now') {
    // Using your submit button locator
    await this.page.locator('//button[@type="submit"]').click();
  } else {
    throw new Error(`Unknown button: ${button}`);
  }
});

Then('the user should be redirected to the Dashboard', async function (this: CustomWorld) {
  await this.loginPage.expectDashboard();
});

Then('the user should see a toast message {string}', async function (this: CustomWorld, message: string) {
  // Find all alerts containing the text
  const toast = this.page.locator('div[role="alert"]', { hasText: message });

  // Wait for at least one visible toast
  await expect(toast.first()).toBeVisible({ timeout: 15000 });

  // Optional: log the actual text of the first toast
  const text = await toast.first().textContent();
  console.log('Toast message:', text);

  // Assert that the toast text includes the expected message
  expect(text).toContain(message);
});
