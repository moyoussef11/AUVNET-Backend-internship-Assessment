const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const {
  validateUserRegistration,
  validateUserLogin,
} = require("../utils/validationSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { error } = validateUserRegistration(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message,
    });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      status: "error",
      message: "User with this email already exists",
    });
  }
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    user: newUser,
  });
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const { error } = validateUserLogin(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message,
    });
  }
  const user = await User.findOne({ username })
    .select("-__v")
    .populate("wishlist");
  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "user not found",
    });
  }
  const isMatchPassword = await bcrypt.compare(password, user.password);
  if (!isMatchPassword) {
    return res.status(400).json({
      status: "error",
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role, iss: "AUVNET" },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
  user.password = undefined;

  res.status(200).json({
    status: "success",
    message: "User Login successfully ",
    user,
    token,
  });
});

module.exports = { register, login };
