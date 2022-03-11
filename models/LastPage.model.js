const { Schema, model } = require("mongoose");

const lastPageSchema = new Schema(
  {
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    stockistId: { type: Schema.Types.ObjectId, ref: 'Stockist' },
    catalogueId: { type: Schema.Types.ObjectId, ref: 'Catalogue' }
  },
  {
    timestamps: true,
  }
);

const LastPage = model("LastPage", lastPageSchema);

module.exports = LastPage;