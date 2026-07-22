const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");
const testData = require("../fixtures/testData");
const productData = require("../fixtures/productData");

test("Create Product", async ({ request }) => {
  const api = new ApiHelper(request);

  // Login as Admin
  const loginResponse = await api.login(testData.adminUser);
  expect(loginResponse.status()).toBe(200);

  const { token } = await loginResponse.json();

  // Create Product
  const response = await api.createProduct(
    productData.product,
    token
  );

  console.log("Status:", response.status());

  const body = await response.json();
  console.log("Response:", body);

  expect(response.status()).toBe(201);
  expect(body.success).toBe(true);
  expect(body.message).toBe("Product created successfully");

  expect(body.data).toBeDefined();
  expect(body.data.name).toBe(productData.product.name);
});