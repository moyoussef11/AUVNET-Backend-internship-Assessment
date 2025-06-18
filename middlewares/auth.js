const jwt = require("jsonwebtoken");
const Product = require("../models/Product");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ status: "error", message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ status: "error", message: "Invalid token" });
  }
};
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ status: "error", message: "Access denied only admin." });
  }
  next();
};

const userHimself = (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return res
      .status(403)
      .json({ status: "error", message: "Access denied only user himself." });
  }
  next();
};

const adminOrUserHimself = async (req, res, next) => {
  const { id, role } = req.user;
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({
      status: "error",
      message: "Product not found.",
    });
  }
  if (id === product.userId.toString() || role === "admin") {
    return next();
  }
  return res.status(403).json({
    status: "error",
    message: "Access denied only admin or user himself.",
  });
};


module.exports = { auth, isAdmin, userHimself, adminOrUserHimself };
