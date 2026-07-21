const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const {
  getUsers,
  getProfile,
} = require("../controllers/user.controller");

router.get("/", auth, getUsers);

router.get("/profile", auth, getProfile);

module.exports = router;