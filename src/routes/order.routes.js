const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

const {
  placeOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/order.controller");

router.post("/", auth, placeOrder);
router.get("/", auth, getOrders);
router.get("/:id", auth, getOrderById);

// Admin only
router.put("/:id", auth, admin, updateOrderStatus);
router.delete("/:id", auth, admin, deleteOrder);

module.exports = router;