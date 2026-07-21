const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

// Create Product
router.post("/", auth, createProduct);

// Get All Products
router.get("/", auth, getProducts);

// Get Product by ID
router.get("/:id", auth, getProductById);

// Update Product
router.put("/:id", auth, updateProduct);

// Delete Product
router.delete("/:id", auth, deleteProduct);
module.exports = router;