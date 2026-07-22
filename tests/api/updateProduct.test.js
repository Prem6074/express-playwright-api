const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");
const testData = require("../fixtures/testData");
const productData = require("../fixtures/productData");

test("Update Product", async ({ request }) => {
  const api = new ApiHelper(request);

  // Login as Admin
  const loginResponse = await api.login(testData.adminUser);
  expect(loginResponse.status()).toBe(200);

  const { token } = await loginResponse.json();

  // Create Product
  const createResponse = await api.createProduct(productData.product, token);
  expect(createResponse.status()).toBe(201);

  const createBody = await createResponse.json();
  const productId = createBody.data._id;

  // Update Product
  const response = await api.updateProduct(
    productId,
    {
      name: "Updated Product",
      price: 999,
    },
    token
  );

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log("Response:", body);

  expect(body.success).toBe(true);
  expect(body.data).toBeDefined();
  expect(body.data._id).toBe(productId);
  expect(body.data.name).toBe("Updated Product");
  expect(body.data.price).toBe(999);
});