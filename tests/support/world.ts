import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';
import { LoginPage } from '../Pages/login';
import { CustomerPage } from '../Pages/customer';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  loginPage!: LoginPage;
  customerPage!: CustomerPage;

  firstName!: string;
  lastName!: string;
  email!: string;
  phone!: string;

  constructor(options: any) {
    super(options);
  }

  async init() {
    this.browser = await chromium.launch({ headless: false, slowMo: 200 }); // headless false + slowMo for debugging
    this.context = await this.browser.newContext(); // create context first
    this.page = await this.context.newPage(); // then create page

    this.loginPage = new LoginPage(this.page);
    this.customerPage = new CustomerPage(this.page);
  }

  async close() {
    await this.page.close();
    await this.context.close();
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
