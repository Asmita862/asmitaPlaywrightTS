/*
import { test, expect, request, APIRequestContext } from '@playwright/test';

test.describe('BAHAH API - LoginWithEmailPassword', () => {
  let apiContext: APIRequestContext;

  test.beforeAll(async () => {
    // Initialize API context
    apiContext = await request.newContext({
      baseURL: 'https://stage-mobile-api.bahah.com.au/mobile-api',
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
    });
  });

  test('Login with email and password', async () => {
    const mutation = `
      mutation LoginWithEmailPassword($body: LoginEmailPasswordInput!) {
        loginWithEmailPassword(body: $body) {
          token {
            accessToken
            refreshToken
          }
        }
      }
    `;

    const variables = {
      body: {
        type: 'Customer',
        password: 'Sweetenv123@',
        phoneNumber: {
          dialCode: '+61',
          number: '1232456789',
        },
        email: 'bluelashes@gmail.com',
        deviceId: 'abcde',
      },
    };

    // Send GraphQL POST request
    const response = await apiContext.post('', {
      data: { query: mutation, variables }, // mutation + variables
    });

    // Log response for debugging
    const bodyText = await response.text();
    console.log('Response body:', bodyText);

    // Expect status 200
    expect(response.status()).toBe(200);

    // Parse JSON and validate tokens
    const body = JSON.parse(bodyText);
    const tokens = body.data?.loginWithEmailPassword?.token;

    expect(tokens).toBeDefined();
    expect(tokens.accessToken).toBeTruthy();
    expect(tokens.refreshToken).toBeTruthy();

    console.log('Access Token:', tokens.accessToken);
    console.log('Refresh Token:', tokens.refreshToken);
  });
});

/*

import { test, expect, request, APIRequestContext } from '@playwright/test';

test.describe('BAHAH API - Register and Login User', () => {
  let apiContext: APIRequestContext;

  test.beforeAll(async () => {
    // Initialize API context
    apiContext = await request.newContext({
      baseURL: 'https://stage-mobile-api.bahah.com.au/mobile-api',
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
    });
  });

  test('Register a new user and login with the same credentials', async () => {
    // 1️ Register Mutation
    const registerMutation = `
      mutation RegisterUser($body: SignupInput!) {
        registerUser(body: $body) {
          token {
            accessToken
            refreshToken
          }
          user {
            _id
            aboutYou
          }
          message
        }
      }
    `;

    // Generate a unique email for each test run
    const randomNum = Math.floor(Math.random() * 10000);
    const email = `testuser${randomNum}@example.com`;

    const registerVariables = {
      body: {
        deviceId: 'device123',
        email: email,
        password: 'Password123!',
        type: 'Customer',
        phoneNumber: { dialCode: '+61', number: '1234567890' },
      },
    };

    // Send Register request
    const registerResponse = await apiContext.post('', {
      data: { query: registerMutation, variables: registerVariables },
    });

    const registerBody = await registerResponse.json();
    console.log('Register Response:', registerBody);

    expect(registerResponse.status()).toBe(200);
    expect(registerBody.data.registerUser.token.accessToken).toBeTruthy();

    // 2️ Login Mutation
    const loginMutation = `
      mutation LoginWithEmailPassword($body: LoginEmailPasswordInput!) {
        loginWithEmailPassword(body: $body) {
          token {
            accessToken
            refreshToken
          }
          user {
            _id
          }
        }
      }
    `;

    const loginVariables = {
      body: {
        type: 'Customer',
        email: email,               // use same email as registered
        password: 'Password123!',   // use same password
        deviceId: 'device123',
        phoneNumber: { dialCode: '+61', number: '1234567890' },
      },
    };

    // Send Login request
    const loginResponse = await apiContext.post('', {
      data: { query: loginMutation, variables: loginVariables },
    });

    const loginBody = await loginResponse.json();
    console.log('Login Response:', loginBody);

    expect(loginResponse.status()).toBe(200);
    expect(loginBody.data.loginWithEmailPassword.token.accessToken).toBeTruthy();
    expect(loginBody.data.loginWithEmailPassword.token.refreshToken).toBeTruthy();

    console.log('Access Token:', loginBody.data.loginWithEmailPassword.token.accessToken);
    console.log('Refresh Token:', loginBody.data.loginWithEmailPassword.token.refreshToken);
  });
});

*/


import { test, expect, request, APIRequestContext } from '@playwright/test';

test.describe('BAHAH API - Register and Login User', () => {
  let apiContext: APIRequestContext;

  test.beforeAll(async () => {
    // Initialize API context
    apiContext = await request.newContext({
      baseURL: 'https://stage-mobile-api.bahah.com.au/mobile-api',
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
    });
  });

  test('Register a new user and login with the same credentials', async () => {
    // 1️Register User Mutation
    const registerMutation = `
      mutation RegisterUser($body: SignupInput!) {
        registerUser(body: $body) {
          token {
            accessToken
            refreshToken
          }
          user {
            _id
          }
          message
        }
      }
    `;

    // Generate unique email for each test run
    const randomNum = Math.floor(Math.random() * 10000);
    const email = `testuser${randomNum}@example.com`;

    const registerVariables = {
      body: {
        deviceId: 'abc123',
        email: email,
        password: 'Password123!',
        type: 'Customer', // Only fields allowed in SignupInput
      },
    };

    // Send Register request
    const registerResponse = await apiContext.post('', {
      data: { query: registerMutation, variables: registerVariables },
    });

    const registerBody = await registerResponse.json();
    console.log('Register Response:', registerBody);

    // Validate registration
    expect(registerResponse.status()).toBe(200);
    expect(registerBody.data.registerUser.token.accessToken).toBeTruthy();

    // 2️Login Mutation
    const loginMutation = `
      mutation LoginWithEmailPassword($body: LoginEmailPasswordInput!) {
        loginWithEmailPassword(body: $body) {
          token {
            accessToken
            refreshToken
          }
          user {
            _id
          }
        }
      }
    `;

    const loginVariables = {
  body: {
    type: 'Customer',
    email: email,
    password: 'Password123!',
    deviceId: 'abc123',
    phoneNumber: {
      dialCode: '+61',
      number: '1234567890'
    },
  },
};

    // Send Login request
    const loginResponse = await apiContext.post('', {
      data: { query: loginMutation, variables: loginVariables },
    });

    const loginBody = await loginResponse.json();
    console.log('Login Response:', loginBody);

    // Validate login
    expect(loginResponse.status()).toBe(200);
    expect(loginBody.data.loginWithEmailPassword.token.accessToken).toBeTruthy();
    expect(loginBody.data.loginWithEmailPassword.token.refreshToken).toBeTruthy();

    console.log('Access Token:', loginBody.data.loginWithEmailPassword.token.accessToken);
    console.log('Refresh Token:', loginBody.data.loginWithEmailPassword.token.refreshToken);
  });
});
