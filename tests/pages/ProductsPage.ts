import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for the Products Page
 */
export class ProductsPage extends BasePage {
  // Locators
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsTitle: Locator;
  readonly productInfo: Locator;

  constructor(page: Page) {
    super(page);

    // Define locators
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('button#submit_search');
    this.searchedProductsTitle = page.locator('.features_items .title');
    this.productInfo = page.locator('.single-products .productinfo > p');
  }

  /**
   * Search for a product by name
   * @param productName - Name of the product to search for
   */
  async searchProduct(productName: string) {
    await this.searchInput.click();
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  /**
   * Verify searched products title is visible
   */
  async verifySearchedProductsTitle() {
    await this.searchedProductsTitle.waitFor({ state: 'visible' });
  }

  /**
   * Get searched products title text
   */
  async getSearchedProductsTitle(): Promise<string> {
    return await this.searchedProductsTitle.textContent() || '';
  }

  /**
   * Verify product exists with given name
   * @param productName - Name of the product to verify
   */
  async verifyProductExists(productName: string) {
    await this.productInfo.first().waitFor({ state: 'visible' });
  }

  /**
   * Get product info text
   */
  async getProductInfoText(): Promise<string> {
    return await this.productInfo.first().textContent() || '';
  }
}
