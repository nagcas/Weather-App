import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// Configuring dotenv to load environment variables from the .env file
dotenv.config()

const SECRET_KEY = process.env.JWT_SECRET

const authMiddleware = (req, res, next) => {
  // Extract token from Authorization header
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).send('Access Denied. Token not provided.')
  }

  // The token is expected to be in format "Bearer <token>"
  const token = authHeader.replace('Bearer ', '')

  try {
    // Verify the token
    const result = jwt.verify(token, SECRET_KEY)
    req.userId = result._id
    next()
  } catch (error) {
    return res.status(401).send('Access Denied. Invalid token.')
  }
}

export default authMiddleware
