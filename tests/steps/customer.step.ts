import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { login, logout } from '../support/auth';
import {CustomerPage } from '../Pages/customer';
import { expect } from '@playwright/test';


// Increase default timeout for slow staging pages
setDefaultTimeout(60000);

Given('I am already logged in and on  dashboard page', async function (this: CustomWorld) {
  await this.init();
  // Use reusable auth.ts login function
  await login(this.page, 'gorakh@ebpearls.com.au', 'Password@1');
});

When('I click on  "Customer" section', async function (this: CustomWorld) {
  await this.customerPage.clickCustomerSection();
});

When('I click on "Add New" button', async function (this: CustomWorld) {
  await this.customerPage.clickAddNewButton();
});

When("I enter customer's first name", async function (this: CustomWorld) {
  this.firstName = 'Asmita';
  await this.customerPage.enterFirstName(this.firstName);
});

When("I enter customer's last name", async function (this: CustomWorld) {
  this.lastName = 'Aryal';
  await this.customerPage.enterLastName(this.lastName);
});

When("I enter customer's email address", async function (this: CustomWorld) {
  this.email = this.customerPage.generateRandomEmail();
  await this.customerPage.enterEmail(this.email);
});

When("I enter customer's contact number", async function (this: CustomWorld) {
  this.phone = this.customerPage.generateRandomPhone();
  await this.customerPage.enterPhone(this.phone);
});

When('I upload profile picture', async function (this: CustomWorld) {
  const filePath = '/home/ebpearls/Desktop/EB Pearls/download.jpeg';
  await this.customerPage.uploadProfilePicture(filePath);
});
// ------------------- Actions -------------------
When('I click "create new user" button', async function (this: CustomWorld) {
  const customerPage = new CustomerPage(this.page);

  const button = customerPage.createUserButton;
  await button.waitFor({ state: 'visible', timeout: 30000 });

  if (!(await button.isEnabled())) {
    throw new Error('Submit button is not enabled');
  }

  await button.scrollIntoViewIfNeeded();
  await this.page.waitForTimeout(6000);
  await button.click();

  console.log('Current URL after submit:', await this.page.url());
  await this.page.screenshot({ path: 'submit-result.png', fullPage: true });
});

// ------------------- Verifications -------------------
Then('I should see a success message  user was created', async function (this: CustomWorld) {
  const customerPage = new CustomerPage(this.page);

  const toast = customerPage.successToast;
  await toast.waitFor({ state: 'visible', timeout: 20000 });
  await expect(toast).toContainText('User created successfully');
});

Then('I should see  new user added to  customer list', async function (this: CustomWorld) {
  const customerPage = new CustomerPage(this.page);

  await this.page.goto('https://stage-cms.bahah.com.au/app-user/list');
  await this.page.waitForSelector('table', { timeout: 10000 });

  const newUserRow = this.page.locator(`text=${this.email}`);
  await expect(newUserRow).toBeVisible({ timeout: 10000 });
});

Then('I logout from application', async function (this: CustomWorld) {
  await logout(this.page);
});
