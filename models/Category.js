const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

categorySchema.virtual("subcategories", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
