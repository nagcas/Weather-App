import { Schema, model } from 'mongoose'

const citySchema = new Schema(
  {
    cityName: {
      type: String,
      required: true,
      unique: true, // Ensures no two cities can have the same name
      trim: true // Removes any leading or trailing whitespace
    },
    country: {
      type: String,
      required: true, // Corrected from 'require' to 'required'
      trim: true // Removes any leading or trailing whitespace
    },
    users: [
      {
        type: Schema.Types.ObjectId, // This stores the IDs of users who have this city as a favorite
        ref: 'User' // Reference to the User model
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'cities'
  }
)

// Name the model "City" for better clarity and convention
const City = model('cities', citySchema)

export default City
