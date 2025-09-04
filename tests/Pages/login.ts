import { Page, Locator, expect } from '@playwright/test';

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
    this.emailInput = page.locator('//input[@id="outlined-adornment-email-login"]'); 
    this.passwordInput = page.locator('//input[@id="outlined-adornment-password-login"]'); 
    this.togglePasswordIcon = page.locator('//*[name()="path" and contains(@d,"M12 4.5C7 ")]'); 
    this.forgotPasswordLink = page.locator('//a[@class="MuiTypography-root MuiTypography-body1 css-y0akyl"]'); 
    this.signInButton = page.locator('//button[@type="submit"]'); 
    this.validationError = page.locator('.Toastify__toast-body'); 
  }

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

  async expectDashboard() {
    await expect(this.page).toHaveURL('https://stage-cms.bahah.com.au/dashboard');
  }

  async expectValidationError() {
    await expect(this.validationError).toBeVisible();
  }

  // ===== Added loginAs method =====
  async loginAs(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignIn();
  }
}
