const { Schema, model } = require("mongoose");

const firstPageSchema = new Schema(
  {
    image: String,
    title: String, //user.name
    logo: String,  //user.logo
    catalogueId: { type: Schema.Types.ObjectId, ref: 'Catalogue' }
  },
  {
    timestamps: true,
  }
);

const FirstPage = model("FirstPage", firstPageSchema);

module.exports = FirstPage;