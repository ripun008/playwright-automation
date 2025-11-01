import { Page } from '@playwright/test';

/**
 * Base Page Object that all page objects inherit from
 * Contains common functionality shared across all pages
 */
export class BasePage {
  constructor(protected page: Page) {}

  /**
   * Navigate to a specific URL
   */
  async goto(url: string = '/') {
    await this.page.goto(url);
  }

  /**
   * Get the page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }
}
