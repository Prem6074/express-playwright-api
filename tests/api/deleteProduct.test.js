const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");
const testData = require("../fixtures/testData");
const productData = require("../fixtures/productData");

test("Delete Product", async ({ request }) => {
  const api = new ApiHelper(request);

  // Login
  const loginResponse = await api.login(testData.validUser);
  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();
  const token = loginBody.token;

  // Create Product
  const createResponse = await api.createProduct(
    productData.product,
    token
  );

  expect(createResponse.status()).toBe(201);

  const createBody = await createResponse.json();
  const productId = createBody.data._id;

  // Delete Product
  const deleteResponse = await api.deleteProduct(
    productId,
    token
  );

  expect(deleteResponse.status()).toBe(200);

  const deleteBody = await deleteResponse.json();

  expect(deleteBody.success).toBe(true);
  expect(deleteBody.message).toBe("Product deleted successfully");

  // Verify Product is Deleted
  const getResponse = await api.getProductById(
    productId,
    token
  );

  expect(getResponse.status()).toBe(404);

  const getBody = await getResponse.json();

  expect(getBody.success).toBe(false);
  expect(getBody.message).toBe("Product not found");
});