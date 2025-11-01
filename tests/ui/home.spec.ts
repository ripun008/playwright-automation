import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Home Page Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('should display correct page title', async ({ page }) => {
    await expect(page).toHaveTitle('Automation Exercise');
  });

  test('should display main headings on home page', async () => {
    await homePage.verifyPageLoaded();
    await expect(homePage.heading).toBeVisible();
    await expect(homePage.categoryHeading).toBeVisible();
  });

  test('should navigate to products page and search for product', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Navigate to products page
    await homePage.goToProducts();

    // Search for a product
    await productsPage.searchProduct('blue top');

    // Verify search results
    await expect(productsPage.searchedProductsTitle).toContainText('Searched Products');
    await expect(productsPage.productInfo).toContainText('Blue Top');
  });
});
