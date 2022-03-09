const { Schema, model } = require("mongoose");

const stockistSchema = new Schema(
  {
    name: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    description: String,
    commission: Number
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Stockist = model("Stockist", stockistSchema);

module.exports = Stockist;