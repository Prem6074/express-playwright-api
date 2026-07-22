const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");
const testUsers = require("../fixtures/testUsers");
const testData = require("../fixtures/testData");

test("Get User By ID", async ({ request }) => {
  const api = new ApiHelper(request);

  // Login as Admin
  const loginResponse = await api.login(testData.adminUser);
  expect(loginResponse.status()).toBe(200);

  const { token } = await loginResponse.json();

  // Get Customer By ID
  const response = await api.getUserById(
    testUsers.customer.id,
    token
  );

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log("Response:", body);

  expect(body.success).toBe(true);

  // Your API returns the user inside "data"
  expect(body.data).toBeDefined();
  expect(body.data._id).toBe(testUsers.customer.id);
  expect(body.data.email).toBe(testUsers.customer.email);
  expect(body.data.role).toBe("customer");
});