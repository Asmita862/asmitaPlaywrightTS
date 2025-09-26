import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { login, logout } from '../support/auth';
import { CustomerPage } from '../Pages/customer';
import { CustomerFilterPage } from '../Pages/customerfilter';

setDefaultTimeout(60000);

Given('I am logged in as gorakh and on the dashboard for filter tests', async function (this: CustomWorld) {
  await this.init();
  await login(this.page, 'gorakh@ebpearls.com.au', 'Password@1');
  await this.page.waitForTimeout(2000);
});

When('I navigate to the Customer section for filtering', async function (this: CustomWorld) {
  const customerPage = new CustomerPage(this.page);
  await customerPage.clickCustomerSection();
  await this.page.waitForTimeout(3000);
});

When('I open the filter panel for filtering', async function (this: CustomWorld) {
  const customerFilterPage = new CustomerFilterPage(this.page);
  await customerFilterPage.openFilterPanel();
  await customerFilterPage.verifyFilterTitle();
  await this.page.waitForTimeout(3000);
});

When('I select the Active status radio button', async function (this: CustomWorld) {
  const customerFilterPage = new CustomerFilterPage(this.page);
  await customerFilterPage.selectActiveRadio();
  await this.page.waitForTimeout(2000);
});

When('I apply the customer filter', async function (this: CustomWorld) {
  const customerFilterPage = new CustomerFilterPage(this.page);
  await customerFilterPage.clickApplyFilter();
  await this.page.waitForTimeout(3000);
});

Then('I should see only active customers in the list', async function (this: CustomWorld) {
  const customerFilterPage = new CustomerFilterPage(this.page);
  await customerFilterPage.verifyOnlyActiveCustomers();
  await this.page.waitForTimeout(4000);
})


Then('I logout from the customer filter scenario', async function (this: CustomWorld) {
  await logout(this.page);
  await this.page.waitForTimeout(2000);
});
