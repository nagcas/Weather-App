import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate emails
      match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'] // Email validation
    },
    favoriteCities: [
      {
        type: Schema.Types.ObjectId, // This stores the IDs of the favorite cities
        ref: 'cities' // Reference to the City model
        // Each user can have a list of favorite cities, referenced by their IDs
      }
    ]
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    versionKey: false,
    collection: 'users' // Optional, specifies the collection name
  }
)

const User = model('users', userSchema)

export default User
