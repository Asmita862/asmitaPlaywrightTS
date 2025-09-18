import { Page, expect } from "@playwright/test";
import { CustomerPage } from "./customer"; // matches the exported class name

export class CustomerMethods {
  readonly page: Page;
  readonly customer: CustomerPage;

  constructor(page: Page) {
    this.page = page;
    this.customer = new CustomerPage(page); // use the CustomerPage class
  }

  async clickCustomerSection() {
    await this.customer.clickCustomerSection();
  }

  async clickAddNewButton() {
    await this.customer.clickAddNewButton();
  }

  async enterFirstName(name: string) {
    await this.customer.enterFirstName(name);
  }

  async enterLastName(name: string) {
    await this.customer.enterLastName(name);
  }

  generateRandomEmail(): string {
    return `asmita_${Date.now()}@gmail.com`;
  }

  async enterEmail(email: string) {
    await this.customer.enterEmail(email);
  }

  generateRandomPhone(): string {
    return "9" + Math.floor(Math.random() * 9000000000 + 1000000000);
  }

  async enterPhone(phone: string) {
    await this.customer.enterPhone(phone);
  }

  async uploadProfilePicture(filePath: string) {
    await this.customer.uploadProfilePicture(filePath);
  }

  async clickCreateNewUser() {
    await this.customer.clickCreateNewUser();
  }

  async expectSuccessToast(message: string) {
    await this.customer.expectSuccessToast(message);
  }

  async verifyUserInList(email: string) {
    await this.customer.verifyUserInList(email);
  }

  async logout() {
    await this.customer.logout();
  }
}
