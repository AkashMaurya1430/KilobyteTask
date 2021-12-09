const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    availableAt: [
      {
        _id:false,
        address: {
          type: String,
          required: true,
        },
        location: {
          type: { type: String, enum: ["Point"] },
          coordinates: {
            type: [Number],
            index: "2dsphere",
          },
        },
      },
    ],
  },
  { timestamps: true }
);



module.exports = mongoose.model("Item", itemSchema);
