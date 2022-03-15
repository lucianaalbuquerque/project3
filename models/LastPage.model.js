const { Schema, model } = require("mongoose");

const lastPageSchema = new Schema(
  {
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' , default: [] }],
    stockistId: { type: Schema.Types.ObjectId, ref: 'Stockist' , default: null },
    catalogueId: { type: Schema.Types.ObjectId, ref: 'Catalogue' , default: null }
  },
  {
    timestamps: true,
  }
);

const LastPage = model("LastPage", lastPageSchema);

module.exports = LastPage;