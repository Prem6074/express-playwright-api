const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");
const testData = require("../fixtures/testData");

test("Sort Products by Price", async ({ request }) => {
  const api = new ApiHelper(request);

  const loginResponse = await api.login(testData.validUser);
  const { token } = await loginResponse.json();

  const response = await api.getProductsWithQuery(
    "sort=price",
    token
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(true);

  for (let i = 1; i < body.data.length; i++) {
    expect(body.data[i].price).toBeGreaterThanOrEqual(
      body.data[i - 1].price
    );
  }
});