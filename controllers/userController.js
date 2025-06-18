const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const getUsers = asyncHandler(async (req, res) => {
  const POST_PER_PAGE = 5;
  const { pageNumber } = req.query;
  const totalUsers = await User.countDocuments();
  const totalPages = Math.ceil(totalUsers / POST_PER_PAGE);
  let users;
  if (pageNumber) {
    const page = Number(pageNumber);
    const skip = (page - 1) * POST_PER_PAGE;
    users = await User.find()
      .select("-__v -password")
      .skip(skip)
      .limit(POST_PER_PAGE);
  } else {
    users = await User.find().select("-__v -password");
  }

  if (!users) {
    return res.status(404).json({
      status: "error",
      message: "No users found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "Users retrieved successfully",
    users,
    totalUsers,
    totalPages,
    currentPage: pageNumber ? Number(pageNumber) : 1,
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id)
    .select("-__v -password")
    .populate("wishlist");

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "User retrieved successfully",
    user,
  });
});

const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  if (!role || (role !== "admin" && role !== "user")) {
    return res.status(400).json({
      status: "error",
      message: "Invalid role provided",
    });
  }
  const user = await User.findByIdAndUpdate(id, { role }, { new: true });
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "User role updated successfully",
    user,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
  });
});

module.exports = { getUsers, getUserById, updateUserRole, deleteUser };
