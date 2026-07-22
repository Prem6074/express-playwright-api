const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");
const testData = require("../fixtures/testData");
const productData = require("../fixtures/productData");

test("Get All Products", async ({ request }) => {
  const api = new ApiHelper(request);

  // Login as Admin
  const loginResponse = await api.login(testData.adminUser);
  expect(loginResponse.status()).toBe(200);

  const { token } = await loginResponse.json();

  // Create a product
  await api.createProduct(productData.product, token);

  // Get all products
  const response = await api.getProducts(token);

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log("Response:", body);

  expect(body.success).toBe(true);
  expect(Array.isArray(body.data)).toBe(true);
  expect(body.data.length).toBeGreaterThan(0);
});