const { Schema, model } = require("mongoose");

const pageSchema = new Schema(
  {
    index: Number,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
    catalogue: [{ type: Schema.Types.ObjectId, ref: 'Catalogue' }]
  },
  {
    timestamps: true,
  }
);

const Stockist = model("Stockist", stockistSchema);

module.exports = Stockist;