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
    },
    email: {
      type: String,
      required: true,
    },
    favoriteCities: [
      {
        type: Schema.ObjectId, //This is where city IDs go or how the cities will be sotred(through their id)
        ref: "cityModel", // The name of the model to reference .
        // we created a reference here to cityModel so we can associate each user with their favorite cities list
      },
    ],
  },
  {
    timestamps: true,
    collection: "userModels"
  }
);

const userModel = model("User", userSchema);

module.exports = userModel;
