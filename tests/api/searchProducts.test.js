const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");
const testData = require("../fixtures/testData");

test("Search Products", async ({ request }) => {
  const api = new ApiHelper(request);

  const loginResponse = await api.login(testData.validUser);
  const { token } = await loginResponse.json();

  const response = await api.getProductsWithQuery(
    "search=iPhone",
    token
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(true);

  for (const product of body.data) {
    expect(product.name.toLowerCase()).toContain("iphone");
  }
});