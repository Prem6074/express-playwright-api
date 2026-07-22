const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");
const testData = require("../fixtures/testData");
const productData = require("../fixtures/productData");

test("Delete Order", async ({ request }) => {
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

  const createBody = await createResponse.json();
  const productId = createBody.data._id;

  // Customer Login
  const customerLogin = await api.login(testData.customerUser);
  expect(customerLogin.status()).toBe(200);

  const { token: customerToken } = await customerLogin.json();

  // Add Product to Cart
  const cartResponse = await api.addToCart(
    {
      productId,
      quantity: 2,
    },
    customerToken
  );

  expect([200, 201]).toContain(cartResponse.status());

  // Place Order
  const orderResponse = await api.placeOrder(customerToken);

  expect(orderResponse.status()).toBe(201);

  const orderBody = await orderResponse.json();
  console.log("Order Response:", orderBody);

  const orderId =
    orderBody.data?._id ||
    orderBody.order?._id ||
    orderBody._id;

  expect(orderId).toBeDefined();

  // Delete Order
  const deleteResponse = await api.deleteOrder(
    orderId,
    adminToken
  );

  console.log("Delete Status:", deleteResponse.status());

  const deleteBody = await deleteResponse.json();
  console.log("Delete Response:", deleteBody);

  expect(deleteResponse.status()).toBe(200);
  expect(deleteBody.success).toBe(true);
});