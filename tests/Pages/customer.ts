import { Page, expect } from '@playwright/test';

export class CustomerPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
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

  generateRandomEmail() {
    return `asmita_${Date.now()}@gmail.com`;
  }

  async enterEmail(email: string) {
    await this.page.fill('input[placeholder="Your Email address"]', email);
  }

  generateRandomPhone() {
    return '9' + Math.floor(Math.random() * 9000000000 + 1000000000);
  }

  async enterPhone(phone: string) {
    await this.page.fill('input[placeholder="Phone"]', phone);
  }

  async uploadProfilePicture(filePath: string) {
    await this.page.setInputFiles('input#image', filePath);
  }

  async clickCreateNewUser() {
    const button = this.page.locator('//button[@type="submit"]');
    await button.waitFor({ state: 'visible', timeout: 40000 });
    await button.click();
  }

  async expectSuccessToast(message: string) {
    const toast = this.page.locator("div.MuiAlert-message", { hasText: message });
    await expect(toast.first()).toBeVisible({ timeout: 30000 });
  }

  async verifyUserInList(email: string) {
    const row = this.page.locator(`text=${email}`);
    await expect(row).toBeVisible({ timeout: 10000 });
  }

  async logout() {
    await this.page.click("//div[@class='MuiAvatar-root']//*[name()='svg']");
    await this.page.click("//p[normalize-space()='Logout']");
    await expect(this.page).toHaveURL('https://stage-cms.bahah.com.au/login');
  }
}
