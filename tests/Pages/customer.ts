import { Page, Locator, expect } from '@playwright/test';

export class CustomerPage {
  readonly page: Page;
  readonly createUserButton: Locator;
  readonly successToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createUserButton = page.locator('//button[@type="submit"]');
    this.successToast = page.locator("div.MuiAlert-message");
  }

  async clickCustomerSection() {
    await this.page.click('text=Customers');
  }

  async clickAddNewButton() {
    await this.page.click('text=Add New');
  }

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

  // ------------------- NEW SEARCH METHODS -------------------
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

    // Optional: verify at least one row contains the first name
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

  async logout() {
    await this.page.click("//div[@class='MuiAvatar-root']//*[name()='svg']");
    await this.page.click("//p[normalize-space()='Logout']");
    await expect(this.page).toHaveURL('https://stage-cms.bahah.com.au/login');
  }
}
