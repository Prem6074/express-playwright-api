const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");
const testData = require("../fixtures/testData");
const productData = require("../fixtures/productData");

test("Create Product", async ({ request }) => {
  const api = new ApiHelper(request);

  // Login
  const loginResponse = await api.login(testData.validUser);
  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();
  const token = loginBody.token;

  // Create Product
  const response = await api.createProduct(
    productData.product,
    token
  );

  expect(response.status()).toBe(201);

  const body = await response.json();

  expect(body.success).toBe(true);
  expect(body.message).toBe("Product created successfully");
  expect(body.data.name).toBe(productData.product.name);
  expect(body.data.price).toBe(productData.product.price);
  expect(body.data.category).toBe(productData.product.category);
}
);