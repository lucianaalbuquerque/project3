const { Schema, model } = require("mongoose");

const lastPageSchema = new Schema(
  {
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    commission: Number, //stockist.commission
    catalogueId: { type: Schema.Types.ObjectId, ref: 'Catalogue' }
  },
  {
    timestamps: true,
  }
);

const LastPage = model("LastPage", lastPageSchema);

module.exports = LastPage;