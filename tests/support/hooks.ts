import { Before, After, AfterAll, setDefaultTimeout } from "@cucumber/cucumber";
import { CustomWorld } from "./world";
import fs from "fs";
import path from "path";

setDefaultTimeout(30 * 1000);

// Launch new page for each scenario
Before(async function (this: CustomWorld) {
  await this.init(); // should create context + page, reusing same browser
});

After(async function (this: CustomWorld, scenario) {
  if (this.page) {
    const screenshotsDir = path.join(__dirname, "../reports/screenshots");
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    const screenshotPath = path.join(
      screenshotsDir,
      `${scenario.pickle.name.replace(/ /g, "_")}.png`
    );

    const screenshot = await this.page.screenshot({ path: screenshotPath, fullPage: true });
    this.attach(screenshot, "image/png");
  }

  // Close only the page + context
  await this.page?.close();
  await this.context?.close();
});

// Close the browser once after all scenarios
AfterAll(async function () {
  const world = this as unknown as CustomWorld;
  await world.browser?.close();
});
