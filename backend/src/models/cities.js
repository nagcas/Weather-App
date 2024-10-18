import { Schema, model } from "mongoose";

const citySchema = new Schema(
  {
    cityName: {
      type: String,
      required: true,
      unique: true, // Ensures no two cities can have the same name
      trim: true,   // Removes any leading or trailing whitespace
    },
    country: {
      type: String,
      required: true, // Corrected from 'require' to 'required'
      trim: true,     // Removes any leading or trailing whitespace
    },
    users: [
      {
        type: Schema.Types.ObjectId, // This stores the IDs of users who have this city as a favorite
        ref: "User", // Reference to the User model
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    collection: "cityModels", // Optional: the name of the collection in the database
  }
);

// Name the model "City" for better clarity and convention
const City = model("City", citySchema);

export default City;


