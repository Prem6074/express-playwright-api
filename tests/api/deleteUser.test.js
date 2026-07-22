const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");
const testData = require("../fixtures/testData");

test("Delete User", async ({ request }) => {
  const api = new ApiHelper(request);

  // Login as Admin
  const loginResponse = await api.login(testData.adminUser);
  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();
  const token = loginBody.token;

  // Create a temporary customer
  const tempEmail = `temp${Date.now()}@test.com`;

  const registerResponse = await api.register({
    name: "Temporary User",
    email: tempEmail,
    password: "password123",
    role: "customer",
  });

  expect(registerResponse.status()).toBe(201);

  const registerBody = await registerResponse.json();
  console.log("Register Response:", registerBody);

  // Support different API response formats
  const userId =
    registerBody.data?._id ||
    registerBody.user?._id ||
    registerBody._id;

  expect(userId).toBeDefined();

  // Delete the temporary user
  const deleteResponse = await api.deleteUser(userId, token);

  expect(deleteResponse.status()).toBe(200);

  const deleteBody = await deleteResponse.json();
  console.log("Delete Response:", deleteBody);

  expect(deleteBody.success).toBe(true);
});