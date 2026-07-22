const { test, expect } = require("@playwright/test");

let customerToken;

test.beforeAll(async ({ request }) => {
  const loginResponse = await request.post("/api/auth/login", {
    data: {
      email: "prem@test3.com",
      password: "prem@123", // Customer credentials
    },
  });

  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();

  console.log("Customer Login Response:", loginBody);

  customerToken = loginBody.token;

  expect(customerToken).toBeTruthy();
});

test("Customer should NOT create a product", async ({ request }) => {
  const response = await request.post("/api/products", {
    headers: {
      Authorization: `Bearer ${customerToken}`,
    },
    data: {
      name: "Samsung S25",
      description: "Latest Samsung Mobile",
      price: 85000,
      category: "Mobiles",
    },
  });

  const body = await response.json();

  console.log("Create Product Response:", body);

  expect(response.status()).toBe(403);
  expect(body.success).toBe(false);
  expect(body.message).toBe("Access denied. Admin only.");
});