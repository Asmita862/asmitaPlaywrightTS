import { Page, Locator, expect } from "@playwright/test";
/**
 * Login Page Object Model
 * Uses provided locators for the app
 */
export class LoginPage {
  readonly page: Page;

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly togglePasswordIcon: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signInButton: Locator;
  readonly validationError: Locator;

  constructor(page: Page) {
    this.page = page;

    // === Locators ===
    this.emailInput = page.locator('//input[@id="outlined-adornment-email-login"]'); // Email input
    this.passwordInput = page.locator('//input[@id="outlined-adornment-password-login"]'); // Password input
    this.togglePasswordIcon = page.locator('//*[name()="path" and contains(@d,"M12 4.5C7 ")]'); // Toggle password icon
    this.forgotPasswordLink = page.locator('//a[@class="MuiTypography-root MuiTypography-body1 css-y0akyl"]'); // Forgot password link
    this.signInButton = page.locator('//button[@type="submit"]'); // Sign in now button
    this.validationError = page.locator('.Toastify__toast-body'); // Validation/Toast messages
  }

  // === Actions ===
  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async togglePasswordVisibility() {
    await this.togglePasswordIcon.click();
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  async clickSignIn() {
    await this.signInButton.click();
  }

  // === Assertions ===
  async expectDashboard() {
    await expect(this.page).toHaveURL('https://stage-cms.bahah.com.au/dashboard');
  }

  async expectValidationError() {
    await expect(this.validationError).toBeVisible();
  }
}
