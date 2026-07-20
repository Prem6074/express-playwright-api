const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");

test("Get Users", async ({ request }) => {
  const api = new ApiHelper(request);

  const response = await api.getUsers();

  expect(response.status()).toBe(200);

  const users = await response.json();

  expect(users.length).toBeGreaterThan(0);
});

test("Get Profile", async ({ request }) => {
  const api = new ApiHelper(request);

  const response = await api.getProfile();

  expect(response.status()).toBe(200);

  const profile = await response.json();

  expect(profile.name).toBe("Prem");
});