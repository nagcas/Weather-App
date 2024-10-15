import { Schema, model } from "mongoose";

const citySchema = new Schema(
  {
    cityName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    country: {
      type: String,
      require: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "cityModels",
  }
);

const cityModel = model("cityModel", citySchema);

module.exports = cityModel;
