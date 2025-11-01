import { APIRequestContext } from '@playwright/test';

/**
 * Interface for user creation data
 */
export interface UserData {
  name?: string;
  email?: string;
  password?: string;
  title?: string;
  birth_date?: string;
  birth_month?: string;
  birth_year?: string;
  firstname?: string;
  lastname?: string;
  company?: string;
  address1?: string;
  address2?: string;
  country?: string;
  zipcode?: string;
  state?: string;
  city?: string;
  mobile_number?: string;
}

/**
 * Interface for user creation response
 */
export interface CreateUserResponse {
  responseCode: number;
  message: string;
}

/**
 * Generates a unique email address for testing
 * @returns A unique email address with timestamp and random string
 */
export function generateUniqueEmail(): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const uniqueId = `${timestamp}-${randomString}`;
  return `test-${uniqueId}@example.com`;
}

/**
 * Default user data values
 */
const DEFAULT_USER_DATA: Required<UserData> = {
  name: 'Mark Flint',
  email: '', // Will be generated if not provided
  password: 'test1234',
  title: 'Mr',
  birth_date: '01',
  birth_month: '01',
  birth_year: '1980',
  firstname: 'Mark',
  lastname: 'Flint',
  company: 'testOrg',
  address1: 'main st.',
  address2: 'apt 1',
  country: 'USA',
  zipcode: '10001',
  state: 'NY',
  city: 'NYC',
  mobile_number: '2122345678'
};

/**
 * Creates a new user account via API
 * @param request - Playwright APIRequestContext
 * @param userData - Optional partial user data to override defaults
 * @returns Response from the API with status code and message
 *
 * @example
 * ```typescript
 * // Create user with defaults
 * const response = await createUser(request);
 *
 * // Create user with custom data
 * const response = await createUser(request, {
 *   name: 'John Doe',
 *   firstname: 'John',
 *   lastname: 'Doe'
 * });
 *
 * // Access the generated email
 * console.log(response.email);
 * ```
 */
export async function createUser(
  request: APIRequestContext,
  userData: UserData = {}
): Promise<CreateUserResponse & { email: string }> {
  // Generate unique email if not provided
  const email = userData.email || generateUniqueEmail();

  // Merge user data with defaults
  const completeUserData = {
    ...DEFAULT_USER_DATA,
    ...userData,
    email
  };

  // Make API request
  const response = await request.post('/api/createAccount', {
    form: completeUserData
  });

  // Parse response
  const responseBody = await response.json();

  // Return response with email for reference
  return {
    responseCode: responseBody.responseCode,
    message: responseBody.message,
    email
  };
}

/**
 * Verifies a user login via API
 * @param request - Playwright APIRequestContext
 * @param email - User email
 * @param password - User password
 * @returns Response from the API
 */
// export async function verifyLogin(
//   request: APIRequestContext,
//   email: string,
//   password: string
// ): Promise<CreateUserResponse> {
//   const response = await request.post('/api/verifyLogin', {
//     form: {
//       email,
//       password
//     }
//   });

//   const responseBody = await response.json();

//   return {
//     responseCode: responseBody.responseCode,
//     message: responseBody.message
//   };
// }
