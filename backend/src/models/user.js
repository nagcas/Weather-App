import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // This ensures the password is not returned in queries unless explicitly requested
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate emails
      match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'], // Email validation
    },
    favoriteCities: [
      {
        type: Schema.Types.ObjectId, // This stores the IDs of the favorite cities
        ref: "City", // Reference to the City model
        // Each user can have a list of favorite cities, referenced by their IDs
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    collection: "userModels", // Optional, specifies the collection name
  }
);

const userModel = model("User", userSchema);

export default userModel;

