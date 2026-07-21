const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");
const testData = require("../fixtures/testData");

test("Pagination", async ({ request }) => {
  const api = new ApiHelper(request);

  const loginResponse = await api.login(testData.validUser);
  const { token } = await loginResponse.json();

  const response = await api.getProductsWithQuery(
    "page=1&limit=2",
    token
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(true);
  expect(body.page).toBe(1);
  expect(body.data.length).toBeLessThanOrEqual(2);
});