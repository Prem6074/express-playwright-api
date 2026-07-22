const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cart.controller");

router.post("/", auth, addToCart);
router.get("/", auth, getCart);
router.put("/:cartId", auth, updateCart);
router.delete("/:cartId", auth, removeFromCart);
router.delete("/", auth, clearCart);
module.exports = router;