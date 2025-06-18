const router = require("express").Router();
const {
  getUsers,
  getUserById,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { auth, isAdmin } = require("../middlewares/auth");

router.route("/").get(auth, isAdmin, getUsers);
router
  .route("/:id")
  .get(auth, isAdmin, getUserById)
  .put(auth, isAdmin, updateUserRole)
  .delete(auth, isAdmin, deleteUser);

module.exports = router;
