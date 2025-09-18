import { Page, Locator } from "@playwright/test";

export class PaginationPage {
  readonly page: Page;
  readonly dropdownButton: Locator;
  readonly option5: Locator;
  readonly option10: Locator;
  readonly option15: Locator;
  readonly rows: Locator;

  constructor(page: Page) {
    this.page = page;

    // Use the stable class from your HTML
    this.dropdownButton = page.locator('//button[contains(@class,"pagination-button")]');

    // Row options inside dropdown
    this.option5 = page.locator('//li[@role="menuitem" and @value="5"]');
    this.option10 = page.locator('//li[@role="menuitem" and @value="10"]');
    this.option15 = page.locator('//li[@role="menuitem" and @value="15"]');

    // Table rows
    this.rows = page.locator('table tbody tr');
  }

  async waitForTable() {
    await this.rows.first().waitFor({ state: 'visible', timeout: 10000 });
  }

  async openDropdown() {
    await this.waitForTable();
    console.log("Waiting for pagination dropdown button...");
    await this.dropdownButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.dropdownButton.click();
    console.log(" Clicked pagination dropdown button");
  }

  async selectRowsPerPage(rows: number) {
    await this.openDropdown();

    switch (rows) {
      case 5:
        await this.option5.click();
        break;
      case 10:
        await this.option10.click();
        break;
      case 15:
        await this.option15.click();
        break;
      default:
        throw new Error(`Unsupported row value: ${rows}`);
    }
    console.log(` Selected ${rows} rows per page`);
  }

  async getRowCount(): Promise<number> {
    await this.rows.first().waitFor({ state: 'visible', timeout: 5000 });
    return await this.rows.count();
  }
}
