const { Schema, model } = require("mongoose");

const catalogueSchema = new Schema(
  {
    name: {type: String, default: 'Title'},
    cover: { type: Schema.Types.ObjectId, ref: 'FirstPage', default: null },
    about: { type: Schema.Types.ObjectId, ref: 'SecondPage', default: null },
    pages: [{ type: Schema.Types.ObjectId, ref: 'Page', default: [] }],
    report: { type: Schema.Types.ObjectId, ref: 'LastPage', default: null },
    products: [{ type: Schema.Types.ObjectId, ref: 'Page', default: [] }],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true,
  }
);

const Catalogue = model("Catalogue", catalogueSchema);

module.exports = Catalogue;