const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");
const testData = require("../fixtures/testData");

test("Get All Products", async ({ request }) => {
  const api = new ApiHelper(request);

  // Login
  const loginResponse = await api.login(testData.validUser);
  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();
  const token = loginBody.token;

  // Get Products
  const response = await api.getProducts(token);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(true);
  expect(body.total).toBeGreaterThan(0);
  expect(body.data.length).toBeGreaterThan(0);
});