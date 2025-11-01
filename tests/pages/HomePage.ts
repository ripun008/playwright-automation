import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for the Home/Landing Page
 */
export class HomePage extends BasePage {
  // Locators
  readonly heading: Locator;
  readonly categoryHeading: Locator;
  readonly productsLink: Locator;

  constructor(page: Page) {
    super(page);

    // Define locators
    this.heading = page.getByRole('heading', { name: 'AutomationExercise' });
    this.categoryHeading = page.getByRole('heading', { name: 'Category' });
    this.productsLink = page.getByRole('link', { name: 'Products' });
  }

  /**
   * Navigate to home page
   */
  async navigate() {
    await this.goto('/');
  }

  /**
   * Verify home page is loaded
   */
  async verifyPageLoaded() {
    await this.heading.waitFor({ state: 'visible' });
    await this.categoryHeading.waitFor({ state: 'visible' });
  }

  /**
   * Navigate to Products page
   */
  async goToProducts() {
    await this.productsLink.click();
  }

  /**
   * Verify page title
   */
  async verifyTitle(expectedTitle: string = 'Automation Exercise') {
    const title = await this.getTitle();
    return title === expectedTitle;
  }
}
