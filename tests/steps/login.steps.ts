import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../Pages/login';
import { CustomWorld } from '../support/world';

let loginPage:LoginPage;

Given('the user is on the Login page', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.page.goto('https://stage-cms.bahah.com.au/login');
});

When('the user enters email {string}', async function (email: string) {
  await loginPage.enterEmail(email);
});

When('the user enters password {string}', async function (password: string) {
  await this.loginPage.enterPassword(password);
});

When('the user clicks on {string}', async function (buttonName: string) {
  if (buttonName === 'Sign in now') {
    await this.loginPage.clickSignIn();
  } else if (buttonName === 'Forgot password') {
    await this.loginPage.clickForgotPassword();
  } else if (buttonName === 'Toggle Password') {
    await this.loginPage.togglePasswordVisibility();
  } else {
    throw new Error(`No action defined for button/link: ${buttonName}`);
  }
});

Then('the user should be redirected to the Dashboard', async function () {
  await this.loginPage.expectDashboard();
});

Then('the user should see a validation error message', async function () {
  await this.loginPage.expectValidationError();
});

Then('the user should be redirected to the Forgot Password page', async function () {
  await this.loginPage.page.waitForURL('**/forgot-password');
});
