import { APIRequestContext } from '@playwright/test';

/**
 * Base API class that all API classes inherit from
 * Contains common functionality for API interactions
 */
export class BaseAPI {
  constructor(protected request: APIRequestContext) {}

  /**
   * Parse JSON response safely
   */
  protected async parseResponse(response: any) {
    return await response.json();
  }

  /**
   * Validate response code
   */
  protected validateResponseCode(responseBody: any, expectedCode: number) {
    if (responseBody.responseCode !== expectedCode) {
      throw new Error(
        `Expected response code ${expectedCode} but got ${responseBody.responseCode}. Message: ${responseBody.message}`
      );
    }
  }
}
