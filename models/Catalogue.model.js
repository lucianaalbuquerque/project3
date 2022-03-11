const { Schema, model } = require("mongoose");

const catalogueSchema = new Schema(
  {
    name: String,
    cover: { type: Schema.Types.ObjectId, ref: 'FirstPage' },
    about: { type: Schema.Types.ObjectId, ref: 'SecondPage' },
    pages: [{ type: Schema.Types.ObjectId, ref: 'Page' }],
    report: { type: Schema.Types.ObjectId, ref: 'LastPage' }
  },
  {
    timestamps: true,
  }
);

const Catalogue = model("Catalogue", catalogueSchema);

module.exports = Catalogue;