const router = require("express").Router();
const {
  getProducts,
  createProduct,
  getProduct,
  editProduct,
  deleteProduct,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/productController");
const { auth, adminOrUserHimself } = require("../middlewares/auth");

router.route("/").get(getProducts).post(auth, createProduct);
router
  .route("/:id")
  .get(getProduct)
  .put(auth, adminOrUserHimself, editProduct)
  .delete(auth, adminOrUserHimself, deleteProduct);

router.route("/wishlist/add/:id").get(auth, addToWishlist);
router.route("/wishlist/remove/:id").get(auth, removeFromWishlist);

module.exports = router;
