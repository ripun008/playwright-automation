import { test, expect } from '@playwright/test';
import { UserAPI } from '../api/UserAPI';

test.describe('User API Tests', () => {
  let userAPI: UserAPI;

  test.beforeEach(async ({ request }) => {
    userAPI = new UserAPI(request);
  });

  test('should create user with default values', async () => {
    const response = await userAPI.createUser();

    console.log('Response:', response);
    console.log('Created user email:', response.email);

    // Validate response code
    expect(response.responseCode).toEqual(201);

    // Verify successful user creation message
    expect(response.message).toEqual('User created!');

    // Verify email was generated
    expect(response.email).toBeTruthy();
    expect(response.email).toContain('@example.com');
  });

  test('should create user with custom data', async () => {
    const response = await userAPI.createUser({
      name: 'Jane Smith',
      firstname: 'Jane',
      lastname: 'Smith',
      title: 'Mrs',
      city: 'Boston',
      state: 'MA'
    });

    console.log('Response:', response);
    console.log('Created user email:', response.email);

    // Validate response code
    expect(response.responseCode).toEqual(201);

    // Verify successful user creation message
    expect(response.message).toEqual('User created!');
  });

  test('should verify login with valid credentials', async () => {
    const response = await userAPI.verifyLogin('niohfan8@gmail.com', 'test1234');

    console.log('Response Body:', response);

    // Validate response code
    expect(response.responseCode).toBe(200);

    // Validate success message
    expect(response.message).toContain('User exists!');
  });

  test('should return error when verifying login without email parameter', async ({ request }) => {
    const response = await request.post('/api/verifyLogin', {
      form: { password: 'test1234' }
    });

    const responseBody = await response.json();
    console.log('Response Body:', responseBody);

    // Validate response code
    expect(responseBody.responseCode).toBe(400);

    // Validate error message
    expect(responseBody.message).toContain(
      'Bad request, email or password parameter is missing in POST request.'
    );
  });

  test('should return error when verifying login with invalid credentials', async () => {
    const response = await userAPI.verifyLogin('niohfan8@gmail.com', 'wrongpassword');

    console.log('Response Body:', response);

    // Validate response code
    expect(response.responseCode).toBe(404);

    // Validate error message
    expect(response.message).toContain('User not found!');
  });

  test('should delete user account', async () => {
    // Create user first
    const createResponse = await userAPI.createUser();

    console.log('Create Response:', createResponse);
    console.log('Created user email:', createResponse.email);

    // Validate user creation
    expect(createResponse.responseCode).toEqual(201);
    expect(createResponse.message).toEqual('User created!');

    // Delete the user
    const deleteResponse = await userAPI.deleteUser(createResponse.email, 'test1234');

    console.log('Delete Response:', deleteResponse);

    // Validate deletion response
    expect(deleteResponse.responseCode).toEqual(200);
    expect(deleteResponse.message).toEqual('Account deleted!');
  });

  test('should update user account', async () => {
    // Create user first
    const createResponse = await userAPI.createUser();

    console.log('Create Response:', createResponse);
    console.log('Created user email:', createResponse.email);

    // Validate user creation
    expect(createResponse.responseCode).toEqual(201);
    expect(createResponse.message).toEqual('User created!');

    // Update the user
    const updateResponse = await userAPI.updateUser({
      name: 'Jane Flint',
      email: createResponse.email,
      password: 'test1234',
      title: 'Mrs',
      birth_date: '02',
      birth_month: '02',
      birth_year: '1981',
      firstname: 'Jane',
      lastname: 'Flint',
      company: 'testOrg2',
      address1: '2nd street',
      address2: 'apt 4',
      country: 'United States',
      zipcode: '10002',
      state: 'New York',
      city: 'NYC',
      mobile_number: '6462345678'
    });

    console.log('Update Response:', updateResponse);

    // Validate update response
    expect(updateResponse.responseCode).toEqual(200);
    expect(updateResponse.message).toEqual('User updated!');
  });

  test('should get user account details by email', async () => {
    // Create user first
    const createResponse = await userAPI.createUser();

    console.log('Create Response:', createResponse);
    console.log('Created user email:', createResponse.email);

    // Validate user creation
    expect(createResponse.responseCode).toEqual(201);
    expect(createResponse.message).toEqual('User created!');

    // Get user details
    const getUserResponse = await userAPI.getUserByEmail(createResponse.email);

    console.log('Get User Response:', getUserResponse);

    // Validate response
    expect(getUserResponse.responseCode).toEqual(200);
  });
});
