const router = require("express").Router();
const {
  createCategory,
  getCategoryById,
  getAllCategory,
  editCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { auth, isAdmin } = require("../middlewares/auth");

router.route("/").get(getAllCategory).post(auth, isAdmin, createCategory);
router
  .route("/:id")
  .get(getCategoryById)
  .put(auth, isAdmin, editCategory)
  .delete(auth, isAdmin, deleteCategory);

module.exports = router;
