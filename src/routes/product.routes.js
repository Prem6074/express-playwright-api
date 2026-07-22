const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

// Create Product (Admin Only)
router.post("/", auth, admin, createProduct);

// Get All Products (Authenticated Users)
router.get("/", auth, getProducts);

// Get Product By ID (Authenticated Users)
router.get("/:id", auth, getProductById);

// Update Product (Admin Only)
router.put("/:id", auth, admin, updateProduct);

// Delete Product (Admin Only)
router.delete("/:id", auth, admin, deleteProduct);

module.exports = router;