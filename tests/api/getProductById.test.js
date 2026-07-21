const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");
const testData = require("../fixtures/testData");
const productData = require("../fixtures/productData");

test("Get Product By ID", async ({ request }) => {
  const api = new ApiHelper(request);

  // Login
  const loginResponse = await api.login(testData.validUser);
  expect(loginResponse.status()).toBe(200);

  const { token } = await loginResponse.json();

  // Create a product
  const createResponse = await api.createProduct(productData.product, token);
  expect(createResponse.status()).toBe(201);

  const createBody = await createResponse.json();
  const productId = createBody.data._id;

  // Get product by ID
  const response = await api.getProductById(productId, token);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(true);
  expect(body.data._id).toBe(productId);
  expect(body.data.name).toBe(productData.product.name);
  expect(body.data.price).toBe(productData.product.price);
});