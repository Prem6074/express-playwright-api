require("dotenv").config();

module.exports = {
  adminUser: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },

  customerUser: {
    email: process.env.CUSTOMER_EMAIL,
    password: process.env.CUSTOMER_PASSWORD,
  },

  invalidUser: {
    email: "wrong@test.com",
    password: "wrongpassword",
  },
};