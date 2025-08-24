import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// Configure dotenv to load environment variables from the .env file
dotenv.config()

const SECRET_KEY = process.env.JWT_SECRET

const login = async (req, res) => {
  console.log('request is here')
  try {
    // Extract email and password from request body
    const { email, password } = req.body

    // Find user in database by email
    const existingUser = await User.findOne({ email })
    console.log(email)

    // If user does not exist, return 404 error
    if (!existingUser) {
      console.log('User not found')
      return res.status(404).send('User not found')
    }

    // Compare the provided password with the stored hashed password
    const matchPassword = await bcrypt.compare(password, existingUser.password)
    console.log(matchPassword)

    // If password does not match, return 400 error with message
    if (!matchPassword) {
      return res.status(400).json({ message: 'Invalid Password' })
    }

    // Generate a JWT token with user's email and id, signed with the secret key
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    )

    // Convert user to plain object and remove password
    const { password: _, ...userWithoutPassword } = existingUser.toObject()

    // Return success response with user info and token
    return res.status(200).json(
      {
        user: userWithoutPassword,
        token,
        message: 'Login successful'
      }
    )
  } catch (error) {
    // Log any errors and return 500 server error
    console.log('Error while logging in User: ', error)
    return res.status(500).send('Some error occured')
  }
}

export default login
