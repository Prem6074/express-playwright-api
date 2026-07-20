const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");
const testData = require("../fixtures/testData");

test("Login with valid credentials", async ({ request }) => {
  const api = new ApiHelper(request);

  const response = await api.login(testData.validUser);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(true);
  expect(body.token).toBeTruthy();
});

test("Login with invalid credentials", async ({ request }) => {
  const api = new ApiHelper(request);

  const response = await api.login(testData.invalidUser);

  expect(response.status()).toBe(401);

  const body = await response.json();

  expect(body.success).toBe(false);
});