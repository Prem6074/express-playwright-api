const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");

const {
  getUsers,
  getProfile,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

// Get all users
router.get("/", auth, getUsers);

// Get logged-in user's profile
router.get("/profile", auth, getProfile);

// Get user by ID
router.get("/:id", auth, getUserById);

// Update user
router.put("/:id", auth, updateUser);

// Delete user
router.delete("/:id", auth, deleteUser);
module.exports = router;