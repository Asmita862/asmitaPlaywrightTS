import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { CustomWorld } from "./world";

setDefaultTimeout(30 * 1000); // 30 seconds timeout

Before(async function (this: CustomWorld) {
  await this.init(); // your method to launch browser/page
});

After(async function (this: CustomWorld) {
  if (this.page) {
    await this.page.close();
  }
  if (this.browser) {
    await this.browser.close();
  }
});
