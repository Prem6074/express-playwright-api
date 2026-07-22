const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");
const testData = require("../fixtures/testData");

test("Get Users", async ({ request }) => {
  const api = new ApiHelper(request);

  const login = await api.login(testData.adminUser);
  expect(login.status()).toBe(200);

  const { token } = await login.json();

  const response = await api.getUsers(token);

  expect(response.status()).toBe(200);

  const body = await response.json();

  console.log("Get Users Response:");
  console.log(body);
});

test("Get Profile", async ({ request }) => {
  const api = new ApiHelper(request);

  const login = await api.login(testData.adminUser);
  expect(login.status()).toBe(200);

  const { token } = await login.json();

  const response = await api.getProfile(token);

  expect(response.status()).toBe(200);

  const body = await response.json();

  console.log("Get Profile Response:");
  console.log(body);
});