const { Schema, model } = require("mongoose");

const firstPageSchema = new Schema(
  {
    image: {type: String},
    title: {type: String, default: 'Title'},
    logo: {type: String},
    catalogueId: { type: Schema.Types.ObjectId, ref: 'Catalogue' }
  },
  {
    timestamps: true,
  }
);

const FirstPage = model("FirstPage", firstPageSchema);

module.exports = FirstPage;