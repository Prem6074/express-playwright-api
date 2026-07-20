require("dotenv").config();

module.exports = {
  validUser: {
    email: process.env.EMAIL,
    password: process.env.PASSWORD
  },

  invalidUser: {
    email: "wrong@test.com",
    password: "wrongpassword"
  }
};