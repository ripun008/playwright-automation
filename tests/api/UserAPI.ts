import { APIRequestContext } from '@playwright/test';
import { BaseAPI } from './BaseAPI';
import { UserData, generateUniqueEmail } from '../helpers/user.helper';

/**
 * Response interface for user operations
 */
export interface UserResponse {
  responseCode: number;
  message: string;
}

/**
 * Response interface for user creation
 */
export interface CreateUserResponse extends UserResponse {
  email: string;
}

/**
 * Response interface for getting user details
 */
export interface UserDetailsResponse extends UserResponse {
  user?: any; // Replace 'any' with specific user details interface if API provides it
}

/**
 * API helper class for User-related operations
 * Follows Page Object Model pattern for API calls
 */
export class UserAPI extends BaseAPI {
  private readonly endpoints = {
    createAccount: '/api/createAccount',
    verifyLogin: '/api/verifyLogin',
    deleteAccount: '/api/deleteAccount',
    updateAccount: '/api/updateAccount',
    getUserByEmail: '/api/getUserDetailByEmail'
  };

  constructor(request: APIRequestContext) {
    super(request);
  }

  /**
   * Create a new user account
   * @param userData - Partial user data (uses defaults from helper if not provided)
   * @returns Response with user creation details including generated email
   */
  async createUser(userData: UserData = {}): Promise<CreateUserResponse> {
    const email = userData.email || generateUniqueEmail();

    const defaultUserData = {
      name: 'Mark Flint',
      email,
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

    const completeUserData = { ...defaultUserData, ...userData, email };

    const response = await this.request.post(this.endpoints.createAccount, {
      form: completeUserData
    });

    const responseBody = await this.parseResponse(response);

    return {
      responseCode: responseBody.responseCode,
      message: responseBody.message,
      email
    };
  }

  /**
   * Verify user login credentials
   * @param email - User email
   * @param password - User password
   * @returns Response with login verification status
   */
  async verifyLogin(email: string, password: string): Promise<UserResponse> {
    const response = await this.request.post(this.endpoints.verifyLogin, {
      form: { email, password }
    });

    const responseBody = await this.parseResponse(response);

    return {
      responseCode: responseBody.responseCode,
      message: responseBody.message
    };
  }

  /**
   * Delete a user account
   * @param email - User email
   * @param password - User password
   * @returns Response with deletion status
   */
  async deleteUser(email: string, password: string): Promise<UserResponse> {
    const response = await this.request.delete(this.endpoints.deleteAccount, {
      form: { email, password }
    });

    const responseBody = await this.parseResponse(response);

    return {
      responseCode: responseBody.responseCode,
      message: responseBody.message
    };
  }

  /**
   * Update a user account
   * @param userData - User data to update (must include email)
   * @returns Response with update status
   */
  async updateUser(userData: Required<UserData>): Promise<UserResponse> {
    const response = await this.request.put(this.endpoints.updateAccount, {
      form: userData
    });

    const responseBody = await this.parseResponse(response);

    return {
      responseCode: responseBody.responseCode,
      message: responseBody.message
    };
  }

  /**
   * Get user details by email
   * @param email - User email
   * @returns Response with user details
   */
  async getUserByEmail(email: string): Promise<UserDetailsResponse> {
    const response = await this.request.get(
      `${this.endpoints.getUserByEmail}?email=${email}`
    );

    const responseBody = await this.parseResponse(response);

    return {
      responseCode: responseBody.responseCode,
      message: responseBody.message,
      user: responseBody.user
    };
  }
}
