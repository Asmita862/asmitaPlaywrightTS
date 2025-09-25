import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { login, logout } from '../support/auth';
import { CustomerPage } from '../Pages/customer';
import { expect } from '@playwright/test';

// Increase default timeout for slow staging pages
setDefaultTimeout(60000);

Given('I am already logged in and on dashboard page', async function (this: CustomWorld) {
  await this.init();
  await login(this.page, 'gorakh@ebpearls.com.au', 'Password@1');
});

When('I click on "Customer" section', async function (this: CustomWorld) {
  await this.customerPage.clickCustomerSection();
});

When('I click on "Add New" button', async function (this: CustomWorld) {
  await this.customerPage.clickAddNewButton();
});

When("I enter customer's first name", async function (this: CustomWorld) {
  this.firstName = this.customerPage.generateUniqueFirstName();
  await this.customerPage.enterFirstName(this.firstName);
});

When("I enter customer's last name", async function (this: CustomWorld) {
  this.lastName = this.customerPage.generateUniqueLastName();
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
  const toast = this.customerPage.successToast;
  await toast.waitFor({ state: 'visible', timeout: 20000 });
  await expect(toast).toContainText('User created successfully');
});

Then('I search for newly added user by email address', async function (this: CustomWorld) {
  await this.customerPage.searchCustomerByEmail(this.email);
});

Then('I search for newly added user by first name', async function (this: CustomWorld) {
  await this.customerPage.searchCustomerByFirstName(this.firstName);
});

Then('I search for newly added user by last name', async function (this: CustomWorld) {
  await this.customerPage.searchCustomerByLastName(this.lastName);
});

Then('I should see new user added to customer list', async function (this: CustomWorld) {
  if (!this.email) {
    throw new Error('New customer email not found in World context');
  }
  
  // Verify by email first (most reliable)
  await this.customerPage.searchCustomerByEmail(this.email);

  // Optional: Also verify by first and last name
  if (this.firstName) {
    await this.customerPage.searchCustomerByFirstName(this.firstName);
  }
  if (this.lastName) {
    await this.customerPage.searchCustomerByLastName(this.lastName);
  }
});

Then('I logout from application', async function (this: CustomWorld) {
  await logout(this.page);
});
