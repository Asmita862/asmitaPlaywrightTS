import { World, IWorldOptions } from "@cucumber/cucumber";
import { Browser, Page, chromium } from "@playwright/test";
import { LoginPage } from "../Pages/login";

export class CustomWorld extends World {
  page!: Page;
  browser!: Browser;
  loginPage!: LoginPage;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init() {
    this.browser = await chromium.launch({ headless: false });
    this.page = await this.browser.newPage();
    this.loginPage = new LoginPage(this.page); // ✅ page is now defined
  }

  async close() {
    await this.page.close();
    await this.browser.close();
  }
}
