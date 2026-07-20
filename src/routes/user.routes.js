const express = require("express");
const router = express.Router();

const {
  getUsers,
  getProfile
} = require("../controllers/user.controller");

router.get("/", getUsers);
router.get("/profile", getProfile);

module.exports = router;