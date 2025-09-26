import { Page, expect, Locator } from '@playwright/test';
import { login, logout } from '../support/auth';

export class CustomerEditPage {
  page: Page;
  successToast: Locator;

  constructor(page: Page) {
    this.page = page;
    // Generic toast locator (avoid dynamic CSS classes)
    this.successToast = this.page.locator('div.MuiAlert-message');
  }

  async clickCustomerSection() {
    await this.page.click('text=Customers');
  }

  async clickKebabMenuFirstRow() {
    await this.page.waitForSelector('tbody tr td:nth-child(6) button', { timeout: 10000 });
    await this.page.locator('//tbody/tr[1]/td[6]/button[1]').click();
  }

  async selectEditFromDropdown() {
    await this.page.waitForSelector('text=Edit', { timeout: 5000 });
    await this.page.click('text=Edit');
  }

  async verifyEditPage() {
    await expect(this.page).toHaveURL(/.*\/app-user\/edit.*/, { timeout: 10000 });
  }

  async verifyTitle(titleText: string) {
    const heading = this.page.locator(
      'div.MuiCardHeader-root span.MuiTypography-root.MuiTypography-h5.MuiCardHeader-title',
      { hasText: titleText }
    ).first();
    await expect(heading).toBeVisible({ timeout: 90000 });
  }

  async uploadProfilePicture(filePath: string) {
    await this.page.locator('input[type="file"]').setInputFiles(filePath);
  }

  async selectStatus(status: string) {
    await this.page.locator('//div[@id="customer-status"]').click();
    const option = this.page.locator(`//li[contains(text(), "${status}")]`);
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
  }

  async enterFirstName(firstName: string) {
    await this.page.fill('input[placeholder="Enter first name"]', firstName);
  }

  async enterLastName(lastName: string) {
    await this.page.fill('input[placeholder="Enter last name"]', lastName);
  }

  async verifyEmailAndPhoneDisabled() {
    await expect(this.page.locator('input[placeholder="Enter email"]')).toBeDisabled();
    await expect(this.page.locator('input[placeholder="Phone"]')).toBeDisabled();
  }

  async selectGender(gender: string) {
    await this.page.locator('//div[@id="user-gender"]').click();
    const option = this.page.locator(`li >> text="${gender}"`);
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
  }

  async selectDOB(date: string) {
    const dobInput = this.page.locator('input[placeholder="MM/DD/YYYY"]');
    await dobInput.fill(date);
    await dobInput.press('Enter');
  }

  async typeAndSelectStreet(address: string) {
    await this.page.locator("//input[@placeholder='Enter a location']").fill(address);
    const firstSuggestion = this.page.locator('.pac-item').first();
    await firstSuggestion.waitFor({ state: 'visible', timeout: 20000 });
    await firstSuggestion.click();
  }

   async clickSaveChanges() {
    await this.page.locator('button', { hasText: 'Save Changes' }).click();
  }

  async confirmUpdate(buttonText: string) {
    const yesButton = this.page.locator(`//button[normalize-space(text())='${buttonText}']`);
    await yesButton.waitFor({ state: 'visible', timeout: 10000 });
    await yesButton.scrollIntoViewIfNeeded();
    await yesButton.click({ force: true });
  }

 // Verify toast message reliably
  async verifySuccessToast(message = 'User updated successfully', timeout = 15000) {
    const toast = this.page.getByText(message, { exact: true });
    await expect(toast).toBeVisible({ timeout });
    await expect(toast).toHaveText(message, { timeout });
  }

  // Combined full flow: Save → Confirm → Verify Toast
  async saveConfirmAndVerifyToast(confirmButtonText = 'Yes', toastMessage = 'User updated successfully') {
    await this.clickSaveChanges();
    await this.confirmUpdate(confirmButtonText);
    await this.verifySuccessToast(toastMessage);
  }
}


