const { Schema, model } = require("mongoose");

const secondPageSchema = new Schema(
  {
    description: String, //user.description
    logo: String, //user.logo
    catalogueId: { type: Schema.Types.ObjectId, ref: 'Catalogue' }
  },
  {
    timestamps: true,
  }
);

const SecondPage = model("SecondPage", secondPageSchema);

module.exports = SecondPage;