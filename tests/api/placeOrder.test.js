const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");
const testData = require("../fixtures/testData");
const productData = require("../fixtures/productData");

test("Place Order Successfully", async ({ request }) => {
  const api = new ApiHelper(request);

  // Admin Login
  const adminLogin = await api.login(testData.adminUser);
  expect(adminLogin.status()).toBe(200);

  const { token: adminToken } = await adminLogin.json();

  // Create Product
  const createResponse = await api.createProduct(
    productData.product,
    adminToken
  );

  expect(createResponse.status()).toBe(201);

  const productId = (await createResponse.json()).data._id;

  // Customer Login
  const customerLogin = await api.login(testData.customerUser);
  expect(customerLogin.status()).toBe(200);

  const { token: customerToken } = await customerLogin.json();

  // Add Product to Cart
  await api.addToCart(
    {
      productId,
      quantity: 2,
    },
    customerToken
  );

  // Place Order
  const orderResponse = await api.placeOrder(customerToken);

  expect(orderResponse.status()).toBe(201);

  const body = await orderResponse.json();

  expect(body.success).toBe(true);
  expect(body.message).toBe("Order placed successfully");
  expect(body.data.items.length).toBeGreaterThan(0);
  expect(body.data.status).toBe("Pending");
});