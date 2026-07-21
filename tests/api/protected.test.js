const { test, expect } = require("@playwright/test");

let token;

test.beforeAll(async ({ request }) => {
  const response = await request.post("/api/auth/login", {
    data: {
      email: "prem@test.com",
      password: "password123",
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  token = body.token;
});

test("Get User Profile", async ({ request }) => {
  const response = await request.get("/api/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  expect(response.status()).toBe(200);

  const profile = await response.json();

  expect(profile.success).toBe(true);
  expect(profile.data.email).toBe("prem@test.com");
});

test("Get All Users", async ({ request }) => {
  const response = await request.get("/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  expect(response.status()).toBe(200);

  const users = await response.json();

  expect(users.success).toBe(true);
  expect(users.data.length).toBeGreaterThan(0);
});