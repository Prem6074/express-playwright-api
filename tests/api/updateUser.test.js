const { test, expect } = require("@playwright/test");
const ApiHelper = require("../helpers/ApiHelper");
const testData = require("../fixtures/testData");

test("Update User", async ({ request }) => {
  const api = new ApiHelper(request);

  // Login
  const loginResponse = await api.login(testData.validUser);
  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();
  const token = loginBody.token;

  console.log("Login Response:", loginBody);

  // Get logged-in user's profile
  const profileResponse = await api.getProfile(token);
  expect(profileResponse.status()).toBe(200);

  const profileBody = await profileResponse.json();

  console.log("Profile Response:", profileBody);

  const userId = profileBody.data._id;

  console.log("User ID:", userId);

  // Update data
  const updatedData = {
    name: "Prem Vardhan Updated",
    email: testData.validUser.email,
  };

  // Update user
  const updateResponse = await api.updateUser(
    userId,
    updatedData,
    token
  );

  const body = await updateResponse.json();

  console.log("Update Status:", updateResponse.status());
  console.log("Update Response:", body);

  expect(updateResponse.status()).toBe(200);
  expect(body.success).toBe(true);
  expect(body.message).toBe("User updated successfully");
  expect(body.data._id).toBe(userId);
  expect(body.data.name).toBe(updatedData.name);
  expect(body.data.email).toBe(updatedData.email);
});