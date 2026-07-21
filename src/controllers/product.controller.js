const Product = require("../models/Product");

// Create Product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get All Products with Search, Filter, Sort & Pagination
const getProducts = async (req, res) => {
    try {
      const {
        search,
        category,
        sort,
        page = 1,
        limit = 10,
      } = req.query;
  
      const query = {};
  
      // Search by product name
      if (search) {
        query.name = {
          $regex: search,
          $options: "i",
        };
      }
  
      // Filter by category
      if (category) {
        query.category = category;
      }
  
      // Sorting
      let sortOption = {};
  
      if (sort) {
        sortOption[sort.replace("-", "")] = sort.startsWith("-") ? -1 : 1;
      }
  
      const products = await Product.find(query)
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      const total = await Product.countDocuments(query);
  
      res.status(200).json({
        success: true,
        total,
        page: Number(page),
        totalPages: Math.ceil(total / limit),
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Get Product By ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};