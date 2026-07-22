const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");
const testData = require("../fixtures/testData");

let token;

test.beforeAll(async ({ request }) => {
  const api = new ApiHelper(request);

  const response = await api.login(testData.customerUser);

  expect(response.status()).toBe(200);

  const body = await response.json();
  token = body.token;
});

test("Get User Profile", async ({ request }) => {
  const api = new ApiHelper(request);

  const response = await api.getProfile(token);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(true);
  expect(body.data.email).toBe(testData.customerUser.email);
});

test("Get All Users", async ({ request }) => {
  const api = new ApiHelper(request);

  const response = await api.getUsers(token);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(true);
  expect(body.data.length).toBeGreaterThan(0);
});