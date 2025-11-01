import { test, expect } from '@playwright/test';
import { ProductsAPI } from '../api/ProductsAPI';

test.describe('Products API Tests', () => {
  let productsAPI: ProductsAPI;

  test.beforeEach(async ({ request }) => {
    productsAPI = new ProductsAPI(request);
  });

  test('should get all products list', async () => {
    const response = await productsAPI.getAllProducts();

    // Validate response code
    expect(response.responseCode).toBe(200);

    // Validate products array exists and has items
    expect(response.products).toBeDefined();
    expect(Array.isArray(response.products)).toBe(true);
    expect(response.products!.length).toBeGreaterThan(0);

    // Validate first product structure
    const firstProduct = response.products![0];
    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('name');
    expect(firstProduct).toHaveProperty('price');
  });

  test('should get all brands list', async () => {
    const response = await productsAPI.getAllBrands();

    // Validate response code
    expect(response.responseCode).toBe(200);

    // Validate brands array exists and has items
    expect(response.brands).toBeDefined();
    expect(Array.isArray(response.brands)).toBe(true);
    expect(response.brands!.length).toBeGreaterThan(0);

    // Validate first brand structure
    const firstBrand = response.brands![0];
    expect(firstBrand).toHaveProperty('id');
    expect(firstBrand).toHaveProperty('brand');
  });

  test('should search products by search term', async () => {
    const searchTerm = 'top';
    const response = await productsAPI.searchProducts(searchTerm);

    // Validate response code
    expect(response.responseCode).toBe(200);

    // Validate products array
    expect(response.products).toBeDefined();
    expect(Array.isArray(response.products)).toBe(true);
    expect(response.products!.length).toBeGreaterThan(0);

    // Filter products that have search term in the name
    const productsWithSearchTerm = response.products!.filter((product: any) =>
      product.name.toLowerCase().includes(searchTerm)
    );

    // Validate that at least some products match the search term
    expect(productsWithSearchTerm.length).toBeGreaterThan(0);

    // Validate that the filtered products contain search term in name
    productsWithSearchTerm.forEach((product: any) => {
      expect(product.name.toLowerCase()).toContain(searchTerm);
    });

    // Validate first product structure
    const firstProduct = response.products![0];
    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('name');
    expect(firstProduct).toHaveProperty('price');
    expect(firstProduct).toHaveProperty('brand');
    expect(firstProduct).toHaveProperty('category');
  });

  test('should return error when search_product parameter is missing', async () => {
    const response = await productsAPI.searchProductsWithoutParam();

    // Validate error response code
    expect(response.responseCode).toEqual(400);

    // Verify error message
    expect(response.message).toEqual(
      'Bad request, search_product parameter is missing in POST request.'
    );
  });
});
