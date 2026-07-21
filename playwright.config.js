require("dotenv").config();

const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",

  use: {
    baseURL: process.env.BASE_URL || "http://127.0.0.1:3000",
  },

  reporter: [
    ["list"],
    ["html"],
  ],
});