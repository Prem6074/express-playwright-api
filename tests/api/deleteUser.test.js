const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");
const testData = require("../fixtures/testData");

test("Delete User", async ({ request }) => {
  const api = new ApiHelper(request);

  // Login
  const loginResponse = await api.login(testData.validUser);
  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();
  const token = loginBody.token;

  // Create a temporary user
  const uniqueEmail = `delete${Date.now()}@test.com`;

  const registerResponse = await request.post("/api/auth/register", {
    data: {
      name: "Delete Test User",
      email: uniqueEmail,
      password: "password123",
    },
  });

  expect(registerResponse.status()).toBe(201);

  const registerBody = await registerResponse.json();
  const userId = registerBody.user._id;

  // Delete the temporary user
  const deleteResponse = await api.deleteUser(userId, token);

  expect(deleteResponse.status()).toBe(200);

  const deleteBody = await deleteResponse.json();

  expect(deleteBody.success).toBe(true);
  expect(deleteBody.message).toBe("User deleted successfully");

  // Verify user no longer exists
  const getResponse = await api.getUserById(userId, token);

  expect(getResponse.status()).toBe(404);

  const getBody = await getResponse.json();

  expect(getBody.success).toBe(false);
  expect(getBody.message).toBe("User not found");
});