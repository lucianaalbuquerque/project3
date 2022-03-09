const { Schema, model } = require("mongoose");

const catalogueSchema = new Schema(
  {
    name: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    description: String,
    pages: [{ type: Schema.Types.ObjectId, ref: 'Pages' }]
  },
  {
    timestamps: true,
  }
);

const Stockist = model("Stockist", stockistSchema);

module.exports = Stockist;