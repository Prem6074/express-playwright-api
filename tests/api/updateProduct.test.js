const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");
const testData = require("../fixtures/testData");
const productData = require("../fixtures/productData");

test("Update Product", async ({ request }) => {
  const api = new ApiHelper(request);

  // Login
  const loginResponse = await api.login(testData.validUser);
  expect(loginResponse.status()).toBe(200);

  const { token } = await loginResponse.json();

  // Create Product
  const createResponse = await api.createProduct(
    productData.product,
    token
  );

  expect(createResponse.status()).toBe(201);

  const createBody = await createResponse.json();
  const productId = createBody.data._id;

  // Update Product
  const updatedProduct = {
    name: "Samsung Galaxy S25 Ultra",
    description: "Latest Samsung Flagship",
    price: 139999,
    category: "Mobiles",
    stock: 100,
    image: "s25ultra.png",
  };

  const updateResponse = await api.updateProduct(
    productId,
    updatedProduct,
    token
  );

  expect(updateResponse.status()).toBe(200);

  const body = await updateResponse.json();

  expect(body.success).toBe(true);
  expect(body.message).toBe("Product updated successfully");
  expect(body.data._id).toBe(productId);
  expect(body.data.name).toBe(updatedProduct.name);
  expect(body.data.price).toBe(updatedProduct.price);
  expect(body.data.stock).toBe(updatedProduct.stock);
});