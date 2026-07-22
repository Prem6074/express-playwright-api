const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");
const testUsers = require("../fixtures/testUsers");
const testData = require("../fixtures/testData");

test("Update User", async ({ request }) => {
  const api = new ApiHelper(request);

  // Login as Admin
  const loginResponse = await api.login(testData.adminUser);
  expect(loginResponse.status()).toBe(200);

  const { token } = await loginResponse.json();

  // Update Customer
  const response = await api.updateUser(
    testUsers.customer.id,
    {
      name: "Prem Updated",
    },
    token
  );

  console.log("Status:", response.status());

  const body = await response.json();
  console.log("Response:", body);

  expect(response.status()).toBe(200);
  expect(body.success).toBe(true);
});