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