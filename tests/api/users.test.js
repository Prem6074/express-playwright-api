const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");
const testData = require("../fixtures/testData");

test("Get Users", async ({ request }) => {
  const api = new ApiHelper(request);

  // Login
  const loginResponse = await api.login(testData.validUser);
  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();
  const token = loginBody.token;

  // Get Users
  const response = await api.getUsers(token);

  expect(response.status()).toBe(200);

  const users = await response.json();

  expect(users.success).toBe(true);
  expect(users.data.length).toBeGreaterThan(0);
});

test("Get Profile", async ({ request }) => {
  const api = new ApiHelper(request);

  // Login
  const loginResponse = await api.login(testData.validUser);
  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();
  const token = loginBody.token;

  // Get Profile
  const response = await api.getProfile(token);

  expect(response.status()).toBe(200);

  const profile = await response.json();

  expect(profile.success).toBe(true);
  expect(profile.data.email).toBe(testData.validUser.email);
});