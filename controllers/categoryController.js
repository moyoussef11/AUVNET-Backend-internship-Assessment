const asyncHandler = require("express-async-handler");
const { validateCreateCategory } = require("../utils/validationSchema");
const Category = require("../models/Category");

const createCategory = asyncHandler(async (req, res) => {
  const { error } = validateCreateCategory(req.body);
  const { name, parent } = req.body;
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message,
    });
  }
  const alreadyExit = await Category.findOne({ name });
  if (alreadyExit) {
    return res.status(400).json({
      status: "error",
      message: "Category already exists",
    });
  }
  const category = await Category.create({ name, parent: parent || null });

  res.status(201).json({
    status: "success",
    message: "created category successfully",
    category,
  });
});

const buildCategoryTree = async (categoryId) => {
  const category = await Category.findById(categoryId);
  if (!category) return null;
  const subcategories = await Category.find({ parent: category._id });
  for (let sub of subcategories) {
    const childTree = await buildCategoryTree(sub._id);
    sub.subcategories = childTree ? childTree.subcategories : [];
  }
  category.subcategories = subcategories;
  return category;
};
const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await buildCategoryTree(id);
  if (!category) {
    return res.status(404).json({
      status: "error",
      message: "Category not found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "get category by Id successfully ",
    category,
  });
});

const getAllCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find({ parent: null }).populate(
    "subcategories"
  );
  res.status(200).json({
    status: "success",
    message: "get categories successfully ",
    categories,
  });
});

const editCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  );
  if (!category) {
    return res.status(404).json({
      status: "error",
      message: "Category not found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "deleted category successfully ",
    category,
  });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    return res.status(404).json({
      status: "error",
      message: "Category not found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "edit category successfully ",
    category,
  });
});

module.exports = {
  createCategory,
  getCategoryById,
  getAllCategory,
  editCategory,
  deleteCategory,
};
