const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const { validateCreateProduct } = require("../utils/validationSchema");
const User = require("../models/User");

const getProducts = asyncHandler(async (req, res) => {
  const POST_PER_PAGE = 5;
  const { pageNumber } = req.query;
  const totalProducts = await Product.countDocuments();
  const totalPages = Math.ceil(totalProducts / POST_PER_PAGE);
  let products;
  if (pageNumber) {
    const page = Number(pageNumber);
    const skip = (page - 1) * POST_PER_PAGE;
    products = await Product.find().skip(skip).limit(POST_PER_PAGE);
  } else {
    products = await Product.find();
  }

  if (!products) {
    return res.status(404).json({
      status: "error",
      message: "No products found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "products retrieved successfully",
    products,
    totalProducts,
    totalPages,
    currentPage: pageNumber ? Number(pageNumber) : 1,
  });
});

const createProduct = asyncHandler(async (req, res) => {
  const { title, details, price, category } = req.body;
  const { error } = validateCreateProduct(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message,
    });
  }
  const product = await Product.create({
    userId: req.user.id,
    title,
    details,
    price,
    category,
  });
  res.status(201).json({
    status: "success",
    message: "created product successfully",
    product,
  });
});

const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({
      status: "error",
      message: "product not found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "get product successfully",
    product,
  });
});

const editProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
  if (!product) {
    return res.status(404).json({
      status: "error",
      message: "product not found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "edit product successfully",
    product,
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return res.status(404).json({
      status: "error",
      message: "product not found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "deleted product successfully",
    product,
  });
});

const addToWishlist = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user.wishlist.includes(productId)) {
    user.wishlist.push(productId);
    await user.save();
  }
  res.status(200).json({
    status: "success",
    message: "Product Added To Wishlist successfully",
  });
});

const removeFromWishlist = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (user.wishlist.includes(productId)) {
    user.wishlist.pull(productId);
    await user.save();
  }
  res.status(200).json({
    status: "success",
    message: "Product removed from Wishlist successfully",
  });
});

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  editProduct,
  deleteProduct,
  addToWishlist,
  removeFromWishlist,
};
