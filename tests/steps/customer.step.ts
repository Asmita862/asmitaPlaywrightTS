import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { login, logout } from '../support/auth';

// Increase default timeout for slow staging pages
setDefaultTimeout(60000);

Given('I am already logged in and on the dashboard page', async function (this: CustomWorld) {
  await this.init();
  // Use reusable auth.ts login function
  await login(this.page, 'gorakh@ebpearls.com.au', 'Password@1');
});

When('I click on the "Customer" section', async function (this: CustomWorld) {
  await this.customerPage.clickCustomerSection();
});

When('I click on the "Add New" button', async function (this: CustomWorld) {
  await this.customerPage.clickAddNewButton();
});

When("I enter the customer's first name", async function (this: CustomWorld) {
  this.firstName = 'Asmita';
  await this.customerPage.enterFirstName(this.firstName);
});

When("I enter the customer's last name", async function (this: CustomWorld) {
  this.lastName = 'Aryal';
  await this.customerPage.enterLastName(this.lastName);
});

When("I enter the customer's email address", async function (this: CustomWorld) {
  this.email = this.customerPage.generateRandomEmail();
  await this.customerPage.enterEmail(this.email);
});

When("I enter the customer's contact number", async function (this: CustomWorld) {
  this.phone = this.customerPage.generateRandomPhone();
  await this.customerPage.enterPhone(this.phone);
});

When('I upload profile picture', async function (this: CustomWorld) {
  const filePath = '/home/ebpearls/Desktop/EB Pearls/download.jpeg';
  await this.customerPage.uploadProfilePicture(filePath);
});

When('I click "create new user" button', async function (this: CustomWorld) {
  await this.customerPage.clickCreateNewUser();
});

Then('I should see a success message that the user was created', async function (this: CustomWorld) {
  await this.customerPage.expectSuccessToast('User created successfully');
});

Then('I should see the new user added to the customer list', async function (this: CustomWorld) {
  await this.customerPage.verifyUserInList(this.email);
});

Then('I logout from the application', async function (this: CustomWorld) {
  // Use reusable auth.ts logout function
  await logout(this.page);
  await this.close(); // close browser after test
});
