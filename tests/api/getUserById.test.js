const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");
const testData = require("../fixtures/testData");

test("Get user by ID", async ({ request }) => {
  const api = new ApiHelper(request);

  // Login
  const loginResponse = await api.login(testData.validUser);
  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();
  const token = loginBody.token;

  // Get all users
  const usersResponse = await api.getUsers(token);
  expect(usersResponse.status()).toBe(200);

  const usersBody = await usersResponse.json();
  const userId = usersBody.data[0]._id;

  // Get user by ID
  const response = await api.getUserById(userId, token);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.success).toBe(true);
  expect(body.data._id).toBe(userId);
});