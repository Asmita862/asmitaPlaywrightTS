import { Page, Locator, expect } from '@playwright/test';
import { login, logout } from '../support/auth';

export class CustomerPage {
  readonly page: Page;
  readonly createUserButton: Locator;
  readonly successToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createUserButton = page.locator('//button[@type="submit"]');
    this.successToast = page.locator("div.MuiAlert-message");
  }

  //-------------------- NAVIGATION & FORM METHODS -------------------
  async clickCustomerSection() {
    await this.page.click('text=Customers');
  }

  async clickAddNewButton() {
    await this.page.click('text=Add New');
  }

  //-------------------GENERATE RANDOM DATA & FILL FORM -------------------
  generateUniqueFirstName(prefix: string = 'Asmita'): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let suffix = '';
    for (let i = 0; i < 4; i++) {
      suffix += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return `${prefix}${suffix}`;
  }

  generateUniqueLastName(prefix: string = 'Aryal'): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let suffix = '';
    for (let i = 0; i < 4; i++) {
      suffix += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return `${prefix}${suffix}`;
  }

  //------------------- FILL FORM METHODS -------------------
  async enterFirstName(name: string) {
    await this.page.fill('input[placeholder="Enter first name"]', name);
  }

  async enterLastName(name: string) {
    await this.page.fill('input[placeholder="Enter last name"]', name);
  }

  generateRandomEmail(): string {
    return `asmita_${Date.now()}@gmail.com`;
  }

  async enterEmail(email: string) {
    await this.page.fill('input[placeholder="Your Email address"]', email);
  }

  generateRandomPhone(): string {
    return '9' + Math.floor(Math.random() * 9000000000 + 1000000000);
  }

  async enterPhone(phone: string) {
    await this.page.fill('input[placeholder="Phone"]', phone);
  }

  async uploadProfilePicture(filePath: string) {
    await this.page.setInputFiles('input#image', filePath);
  }

  async clickCreateNewUser() {
    await this.createUserButton.waitFor({ state: 'visible', timeout: 40000 });
    if (!(await this.createUserButton.isEnabled())) {
      throw new Error('Submit button is not enabled');
    }
    await this.createUserButton.click();
  }

  async expectSuccessToast(message: string) {
    const toast = this.successToast.filter({ hasText: message });
    await expect(toast.first()).toBeVisible({ timeout: 30000 });
  }

  async verifyUserInList(email: string) {
    await this.page.goto('https://stage-cms.bahah.com.au/app-user/list');
    await this.page.waitForSelector('table', { timeout: 10000 });
    const row = this.page.locator(`text=${email}`);
    await expect(row).toBeVisible({ timeout: 10000 });
  }

  // ------------------- SEARCH METHODS -------------------
  async searchCustomerByEmail(email: string) {
    await this.page.goto('https://stage-cms.bahah.com.au/app-user/list');
    await this.page.waitForSelector('table', { timeout: 20000 });

    const searchInput = this.page.locator('input[placeholder="Customer"]');
    await searchInput.waitFor({ state: 'visible', timeout: 20000 });

    await searchInput.fill(email);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(3000);

    const userRow = this.page.locator(`text=${email}`);
    await expect(userRow).toBeVisible({ timeout: 10000 });
  }

  async searchCustomerByFirstName(firstName: string) {
    await this.page.goto('https://stage-cms.bahah.com.au/app-user/list');
    await this.page.waitForSelector('table', { timeout: 20000 });

    const searchInput = this.page.locator('input[placeholder="Customer"]');
    await searchInput.waitFor({ state: 'visible', timeout: 20000 });

    await searchInput.fill(firstName);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(3000);

    const row = this.page.locator(`tr:has-text("${firstName}")`);
    await expect(row.first()).toBeVisible({ timeout: 10000 });
  }

  async searchCustomerByLastName(lastName: string) {
    await this.page.goto('https://stage-cms.bahah.com.au/app-user/list');
    await this.page.waitForSelector('table', { timeout: 20000 });

    const searchInput = this.page.locator('input[placeholder="Customer"]');
    await searchInput.waitFor({ state: 'visible', timeout: 20000 });

    await searchInput.fill(lastName);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(3000);

    const row = this.page.locator(`tr:has-text("${lastName}")`);
    await expect(row.first()).toBeVisible({ timeout: 10000 });
  }

  // ------------------- STATUS METHODS -------------------

// Reload page after last name search
async reloadAndSearchByEmail(email: string) {
  await this.page.reload();
  await this.page.waitForSelector('table', { timeout: 20000 });

  const searchInput = this.page.locator('input[placeholder="Customer"]');
  await searchInput.waitFor({ state: 'visible', timeout: 20000 });

  await searchInput.fill(email);
  await this.page.keyboard.press('Enter');
  await this.page.waitForTimeout(3000);

  const row = this.page.locator(`tr:has-text("${email}")`);
  await expect(row.first()).toBeVisible({ timeout: 10000 });
}

// Click kebab menu for a row with given email
async clickKebabMenuByEmail(email: string) {
  const row = this.page.locator(`tr:has-text("${email}")`);
  const kebabButton = row.locator('td:nth-child(6) button'); // adjust index if needed
  await kebabButton.waitFor({ state: 'visible', timeout: 5000 });
  await kebabButton.click();
}

// Select an option from the kebab dropdown (Enable / Disable / Edit)

async selectStatusFromDropdown(option: 'Enable' | 'Disable' | 'Edit') {

  // Step 1: click the first option in the dropdown (<li>)
  const dropdownOption = this.page.locator(`li:has-text("${option}")`);
  await dropdownOption.waitFor({ state: 'visible', timeout: 10000 });
  await dropdownOption.click();

  // Step 2: If a confirmation popup appears, click the second Disable/Enable button

  const confirmButton = this.page.locator(`button:has-text("${option}")`);
  if (await confirmButton.isVisible({ timeout: 5000 })) {
    await confirmButton.click();
  }

  // Small wait for the table to reflect updated status
  await this.page.waitForTimeout(2000);
}

// Get the status text for a customer by email
async getCustomerStatusByEmail(email: string): Promise<string> {
  const row = this.page.locator(`tr:has-text("${email}")`);
  const statusCell = row.locator('td:nth-child(5)'); // adjust index if needed
  return (await statusCell.innerText()).trim();
}

// Verify expected status (Active / Inactive) for a customer by email
async expectCustomerStatusByEmail(email: string, expectedStatus: 'Active' | 'Inactive') {
  const status = await this.getCustomerStatusByEmail(email);
  if (status !== expectedStatus) {
    throw new Error(`Expected status "${expectedStatus}" but found "${status}"`);
  }
}
}
