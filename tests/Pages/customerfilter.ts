import { Page, Locator, expect } from '@playwright/test';

export class CustomerFilterPage {
  private page: Page;
  private filterIcon: Locator;
  private filterTitle: Locator;
  private activeRadioLabel: Locator;
  private applyFilterBtn: Locator;
  private customerStatusCells: Locator;

  constructor(page: Page) {
    this.page = page;
    this.filterIcon = page.locator("//*[name()='g' and @id='SVGRepo_iconCarrier']//*[name()='path' and contains(@fill-rule,'evenodd')]");
    this.filterTitle = page.locator('.MuiStack-root.css-1bhu2ic');
    this.activeRadioLabel = page.locator('span.MuiTypography-root.MuiTypography-body1.MuiFormControlLabel-label', { hasText: 'Active' });
    this.applyFilterBtn = page.locator("//button[normalize-space(.)='Apply filter']");
    this.customerStatusCells = page.locator('.customer-status');
  }

  async openFilterPanel() {
    await this.filterIcon.waitFor({ state: 'visible', timeout: 15000 });
    await this.filterIcon.click();
  }

  async verifyFilterTitle() {
    const title = await this.filterTitle.textContent();
    expect(title?.trim()).toBe('Filter');
  }

  async selectActiveRadio() {
    await this.activeRadioLabel.waitFor({ state: 'visible', timeout: 10000 });
    await this.activeRadioLabel.click();
  }

  async clickApplyFilter() {
    await this.applyFilterBtn.waitFor({ state: 'visible', timeout: 10000 });
    await expect(this.applyFilterBtn).toBeEnabled({ timeout: 10000 });
    await this.applyFilterBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyOnlyActiveCustomers() {
    const statuses = await this.customerStatusCells.allTextContents();
    const allActive = statuses.every(s => s.trim() === 'Active');
    expect(allActive).toBe(true);
  }
}
