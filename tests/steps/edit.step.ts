import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { login, logout } from '../support/auth';
import { CustomerEditPage } from '../Pages/customeredit';

setDefaultTimeout(60000);

Given('I am already logged in and on the dashboard page', async function (this: CustomWorld) {
  await this.init();
  await login(this.page, 'gorakh@ebpearls.com.au', 'Password@1');
  this.customerEditPage = new CustomerEditPage(this.page);
});

When('I click on the "Customer" section', async function (this: CustomWorld) {
  await this.customerEditPage.clickCustomerSection();
});

When('I click on the kebab menu for a customer', async function (this: CustomWorld) {
  await this.customerEditPage.clickKebabMenuFirstRow();
});

When('I select "Edit" from the dropdown', async function (this: CustomWorld) {
  await this.customerEditPage.selectEditFromDropdown();
});

Then('I should be redirected to the Edit User page', async function (this: CustomWorld) {
  await this.customerEditPage.verifyEditPage();
});

Then('I should see the title {string}', async function (this: CustomWorld, titleText: string) {
  await this.customerEditPage.verifyTitle(titleText);
});

When('I upload a profile picture', async function (this: CustomWorld) {
  await this.customerEditPage.uploadProfilePicture('/home/ebpearls/Desktop/EB Pearls/download.jpeg');
});

When('I select status {string}', async function (this: CustomWorld, status: string) {
  await this.customerEditPage.selectStatus(status);
});

When('I enter first name as {string}', async function (this: CustomWorld, firstName: string) {
  await this.customerEditPage.enterFirstName(firstName);
});

When('I enter last name as {string}', async function (this: CustomWorld, lastName: string) {
  await this.customerEditPage.enterLastName(lastName);
});

Then('Email and phone fields should not be clickable', async function (this: CustomWorld) {
  await this.customerEditPage.verifyEmailAndPhoneDisabled();
});

When('I select gender {string}', async function (this: CustomWorld, gender: string) {
  await this.customerEditPage.selectGender(gender);
});

When('I select date of birth {string}', async function (this: CustomWorld, date: string) {
  await this.customerEditPage.selectDOB(date);
});

When('I type and select street {string}', async function (this: CustomWorld, street: string) {
  await this.customerEditPage.typeAndSelectStreet('Sydney Opera House, Sydney NSW, Australia');

});

When('I click Save Changes', async function (this: CustomWorld) {
  await this.customerEditPage.clickSaveChanges();
});

When('I confirm the update by clicking {string}', async function (this: CustomWorld, buttonText: string) {
  await this.customerEditPage.confirmUpdate(buttonText);
});

Then('I should see a success toast message {string}', async function (this: CustomWorld, message: string) {
  await this.customerEditPage.verifySuccessToast(message);
});


Then('I logout from the application', async function (this: CustomWorld) {
  await logout(this.page);
});

