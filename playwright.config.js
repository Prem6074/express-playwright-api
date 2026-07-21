require("dotenv").config();

const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",

  use: {
    baseURL: process.env.BASE_URL || "http://127.0.0.1:3000",
  },

  webServer: {
    command: "npm start",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: false,
    timeout: 120000,
  },

  reporter: [
    ["list"],
    ["html"]
  ]
});