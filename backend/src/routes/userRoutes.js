import express from 'express'
import register from '../controllers/registerController.js'
import login from '../controllers/loginController.js'

const userRouter = express.Router()

// Route for user registration
userRouter.post('/register', register)

// Route for user login
userRouter.post('/login', login)

export default userRouter
