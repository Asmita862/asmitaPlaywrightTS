import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";
import { CustomerPage } from "../Pages/customer";
import { PaginationPage } from "../Pages/pagination";
import { login } from "../support/auth";

// Increase timeout for slow pages
setDefaultTimeout(60000);

Given('I am logged in as a valid user', async function (this: CustomWorld) {
  // Initialize browser and page
  await this.init();

  // Log in using auth.ts
  await login(this.page, 'gorakh@ebpearls.com.au', 'Password@1');

  // Initialize page objects
  this.customerPage = new CustomerPage(this.page);
  this.paginationPage = new PaginationPage(this.page);

  // Navigate to Customer section
  await this.customerPage.clickCustomerSection();
});

When('I select {int} rows per page', async function (this: CustomWorld, rows: number) {
  await this.paginationPage.selectRowsPerPage(rows);
});

Then('I should see at most {int} customers listed', async function (this: CustomWorld, rows: number) {
  const count = await this.paginationPage.getRowCount();
  expect(count).toBeLessThanOrEqual(rows);
});
