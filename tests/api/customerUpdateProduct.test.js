const { test, expect } = require("@playwright/test");

let customerToken;
let productId;

test.beforeAll(async ({ request }) => {
  // Login as Customer
  const loginResponse = await request.post("/api/auth/login", {
    data: {
      email: "prem@test3.com",
      password: "prem@123",
    },
  });

  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();
  customerToken = loginBody.token;

  // Get an existing product
  const productsResponse = await request.get("/api/products", {
    headers: {
      Authorization: `Bearer ${customerToken}`,
    },
  });

  expect(productsResponse.status()).toBe(200);

  const productsBody = await productsResponse.json();

  expect(productsBody.data.length).toBeGreaterThan(0);

  productId = productsBody.data[0]._id;
});

test("Customer should NOT update a product", async ({ request }) => {
  const response = await request.put(`/api/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${customerToken}`,
    },
    data: {
      name: "Samsung Ultra",
      description: "Updated by customer",
      price: 95000,
      category: "Mobiles",
    },
  });

  expect(response.status()).toBe(403);

  const body = await response.json();

  expect(body.success).toBe(false);
  expect(body.message).toBe("Access denied. Admin only.");
});