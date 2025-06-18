const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
