const { Schema, model } = require("mongoose");

const pageSchema = new Schema(
  {
    pageNumber: Number,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    catalogueId: { type: Schema.Types.ObjectId, ref: 'Catalogue' }
  },
  {
    timestamps: true,
  }
);

const Page = model("Page", pageSchema);

module.exports = Page;