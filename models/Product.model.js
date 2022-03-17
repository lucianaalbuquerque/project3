const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    ref: Number,
    description: String,
    costPrice: Number,
    price: Number,
    imageUrl: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;