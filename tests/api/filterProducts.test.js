const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");
const testData = require("../fixtures/testData");
const productData = require("../fixtures/productData");

test("Filter Products by Category", async ({ request }) => {

  const api = new ApiHelper(request);

  const loginResponse = await api.login(testData.adminUser);
  expect(loginResponse.status()).toBe(200);

  const { token } = await loginResponse.json();

  await api.createProduct(productData.product, token);

  const response = await api.getProductsWithQuery(
    "category=Electronics",
    token
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(true);
});