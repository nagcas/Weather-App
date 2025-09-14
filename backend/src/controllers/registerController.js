import userModel from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import handleHttpError from '../utils/handleError.js'

// Configuring dotenv to load environment variables from the .env file
dotenv.config()

const SECRET_KEY = process.env.JWT_SECRET

// const SECRET_KEY = 'Register_api' //will change it afterwards

const register = async (req, res) => {
  try {
    const { email, password, username } = req.body
    // console.log(email, password, username)

    // Checking existing user . as it connects with db to find that user ,we need to make it await
    const existingUser = await userModel.findOne({ email })

    if (existingUser) {
      return res.status(400).send('This email already exist')
    }

    // If user doesnt exist then we create a hashed password and create a user object to store it

    const hashPassword = await bcrypt.hash(password, 10)

    const user = {
      email,
      password: hashPassword,
      username
    }

    const result = await userModel.create(user)

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY)

    return res.status(201).json({ user: result, token })
  } catch (error) {
    console.log('Error while crating user: ', error.message)
    handleHttpError(
      res,
      error.message.includes('HTTP error') ? error.message : undefined
    )
  }
}

export default register
