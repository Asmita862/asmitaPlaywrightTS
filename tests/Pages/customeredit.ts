import { Page, expect } from '@playwright/test';
import path from 'path';

export class CustomerEditPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickCustomerSection() {
    await this.page.click('text=Customers');
  }

  async clickKebabMenuFirstRow() {
    await this.page.waitForSelector('tbody tr td:nth-child(6) button', { timeout: 10000 });
    const kebabButton = this.page.locator('//tbody/tr[1]/td[6]/button[1]');
    await kebabButton.click();
  }

  async selectEditFromDropdown() {
    await this.page.waitForSelector('text=Edit', { timeout: 5000 });
    await this.page.click('text=Edit');
  }

  async verifyEditPage() {
    await expect(this.page).toHaveURL(/.*\/app-user\/edit.*/, { timeout: 10000 });
  }

  /*async verifyTitle(expectedTitle: string) {
  const titleLocator = this.page.locator(
    'div.MuiCardHeader-root span.MuiTypography-root.MuiTypography-h5.MuiCardHeader-title'
  ).first();
*/

async verifyTitle(expectedTitle: string) {
  const titleLocator = this.page.locator(
    'div.MuiCardHeader-root span.MuiTypography-root.MuiTypography-h5.MuiCardHeader-title'
  ).first();

  // Debug log
  const actualText = await titleLocator.textContent();
  console.log("DEBUG: Found title text =>", actualText);

  // Check the actual text
  await expect(titleLocator).toHaveText(expectedTitle, { timeout: 60000 });
}

  async uploadProfilePicture(filePath: string) {
    const resolvedPath = path.resolve(filePath);
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.setInputFiles(resolvedPath);
  }

  async selectStatus(status: string) {
    const statusDropdown = this.page.locator('//div[@id="customer-status"]');
    await statusDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await statusDropdown.click();
    const option = this.page.locator(`//li[contains(text(), "${status}")]`);
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
  }

  async enterFirstName(name: string) {
    await this.page.fill('input[placeholder="Enter first name"]', name);
  }

  async enterLastName(name: string) {
    await this.page.fill('input[placeholder="Enter last name"]', name);
  }

  async verifyEmailAndPhoneDisabled() {
    const emailField = this.page.locator('input[placeholder="Enter email"]');
    const phoneField = this.page.locator('input[placeholder="Phone"]');
    await expect(emailField).toBeDisabled();
    await expect(phoneField).toBeDisabled();
  }

  async selectGender(gender: string) {
    const genderDropdown = this.page.locator('//div[@id="user-gender"]');
    await genderDropdown.click();
    const option = this.page.locator(`li >> text="${gender}"`);
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
  }

  async selectDOB(date: string) {
    const dobInput = this.page.locator('input[placeholder="MM/DD/YYYY"]');
    await dobInput.click();
    await dobInput.fill(date);
    await dobInput.press('Enter');
  }

  async typeAndSelectStreet(street: string) {
    const streetInput = this.page.locator("//input[@placeholder='Enter a location']");
    await streetInput.fill(street);
    const firstSuggestion = this.page.locator('.pac-item').first();
    await firstSuggestion.waitFor({ state: 'visible', timeout: 5000 });
    await firstSuggestion.click();
  }

  async clickSaveChanges() {
    const saveButton = this.page.locator('button', { hasText: 'Save Changes' });
    await saveButton.click();
  }

  async confirmUpdate(buttonText: string) {
    const yesButton = this.page.locator(`//button[normalize-space(text())='${buttonText}']`);
    await yesButton.waitFor({ state: 'visible', timeout: 10000 });
    await yesButton.scrollIntoViewIfNeeded();
    await yesButton.click({ force: true });
    await this.page.waitForTimeout(20000);
  }

  async verifySuccessToast(expectedMessage: string) {
    const toast = this.page.locator('.Toastify__toast-body');
    await expect(toast).toBeVisible({ timeout: 10000 });
    await expect(toast).toContainText(expectedMessage);
  }
}
