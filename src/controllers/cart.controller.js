const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add Product to Cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if product already exists in cart
    let cartItem = await Cart.findOne({
      user: req.user.id,
      product: productId,
    });

    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        user: req.user.id,
        product: productId,
        quantity: quantity || 1,
      });
    }

    res.status(201).json({
      success: true,
      message: "Product added to cart",
      data: cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Logged-in User Cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user.id,
    }).populate("product");

    res.status(200).json({
      success: true,
      count: cart.length,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Cart Quantity
const updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { cartId } = req.params;

    // Find cart item using Cart ID
    const cartItem = await Cart.findOne({
      _id: cartId,
      user: req.user.id,
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Remove Product from Cart
const removeFromCart = async (req, res) => {
    try {
      const { cartId } = req.params;
  
      const cartItem = await Cart.findOne({
        _id: cartId,
        user: req.user.id,
      });
  
      if (!cartItem) {
        return res.status(404).json({
          success: false,
          message: "Cart item not found",
        });
      }
  
      await Cart.findByIdAndDelete(cartId);
  
      res.status(200).json({
        success: true,
        message: "Product removed from cart",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  // Clear Cart
const clearCart = async (req, res) => {
    try {
      await Cart.deleteMany({
        user: req.user.id,
      });
  
      res.status(200).json({
        success: true,
        message: "Cart cleared successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
  clearCart,
};