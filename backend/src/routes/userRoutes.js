import express from 'express'
import register from '../controllers/registerController.js'
import login from '../controllers/loginController.js'

const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)

export default userRouter
