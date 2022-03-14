const { Schema, model } = require("mongoose");

const firstPageSchema = new Schema(
  {
    image: {type: String, default: 'https://unsplash.com/photos/X5BWooeO4Cw'},
    title: {type: String, default: 'Title'},
    logo: {type: String, default: 'https://unsplash.com/photos/X5BWooeO4Cw'},
    catalogueId: { type: Schema.Types.ObjectId, ref: 'Catalogue' }
  },
  {
    timestamps: true,
  }
);

const FirstPage = model("FirstPage", firstPageSchema);

module.exports = FirstPage;