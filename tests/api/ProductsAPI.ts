import { APIRequestContext } from '@playwright/test';
import { BaseAPI } from './BaseAPI';

/**
 * Response interface for products operations
 */
export interface ProductsResponse {
  responseCode: number;
  products?: any[];
  message?: string;
}

/**
 * Response interface for brands operations
 */
export interface BrandsResponse {
  responseCode: number;
  brands?: any[];
  message?: string;
}

/**
 * API helper class for Products-related operations
 * Follows Page Object Model pattern for API calls
 */
export class ProductsAPI extends BaseAPI {
  private readonly endpoints = {
    productsList: '/api/productsList',
    brandsList: '/api/brandsList',
    searchProduct: '/api/searchProduct'
  };

  constructor(request: APIRequestContext) {
    super(request);
  }

  /**
   * Get all products list
   * @returns Response with list of all products
   */
  async getAllProducts(): Promise<ProductsResponse> {
    const response = await this.request.get(this.endpoints.productsList);
    const responseBody = await this.parseResponse(response);

    return {
      responseCode: responseBody.responseCode,
      products: responseBody.products,
      message: responseBody.message
    };
  }

  /**
   * Get all brands list
   * @returns Response with list of all brands
   */
  async getAllBrands(): Promise<BrandsResponse> {
    const response = await this.request.get(this.endpoints.brandsList);
    const responseBody = await this.parseResponse(response);

    return {
      responseCode: responseBody.responseCode,
      brands: responseBody.brands,
      message: responseBody.message
    };
  }

  /**
   * Search for products by search term
   * @param searchTerm - Search term to find products
   * @returns Response with matching products
   */
  async searchProducts(searchTerm: string): Promise<ProductsResponse> {
    const response = await this.request.post(this.endpoints.searchProduct, {
      form: { search_product: searchTerm }
    });

    const responseBody = await this.parseResponse(response);

    return {
      responseCode: responseBody.responseCode,
      products: responseBody.products,
      message: responseBody.message
    };
  }

  /**
   * Search products without providing search_product parameter (for negative testing)
   * @returns Response with error message
   */
  async searchProductsWithoutParam(): Promise<ProductsResponse> {
    const response = await this.request.post(this.endpoints.searchProduct);
    const responseBody = await this.parseResponse(response);

    return {
      responseCode: responseBody.responseCode,
      message: responseBody.message
    };
  }
}
