const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");
const testData = require("../fixtures/testData");
const productData = require("../fixtures/productData");

test("Update Cart Quantity", async ({ request }) => {

  const api = new ApiHelper(request);

  const admin = await api.login(testData.adminUser);
  const { token: adminToken } = await admin.json();

  const create = await api.createProduct(productData.product, adminToken);
  const productId = (await create.json()).data._id;

  const customer = await api.login(testData.customerUser);
  const { token: customerToken } = await customer.json();

  const cart = await api.addToCart(
    {
      productId,
      quantity: 1,
    },
    customerToken
  );

  const cartId = (await cart.json()).data._id;

  const response = await api.updateCart(
    cartId,
    5,
    customerToken
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(true);
  expect(body.data.quantity).toBe(5);
});