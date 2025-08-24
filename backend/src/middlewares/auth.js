import { verifyJWT } from '../utils/jwt.js'
import User from '../models/user.js'

// Authentication middleware
export const authMiddleware = async (req, res, next) => {
  try {
    // Extract the JWT token from the request's authorization header
    const token = req.headers.authorization?.replace('Bearer ', '')

    // Check if the token is present
    if (!token) {
      return res.status(401).json({ message: 'Token missing!' })
    }

    // Verify the token and decode the payload
    const decoded = await verifyJWT(token)

    // Find the user in the database using the ID decoded from the token
    const user = await User.findById(decoded.id).select('-password')

    // If the user is not found, send a 401 Unauthorized response
    if (!user) {
      return res.status(401).json({ message: 'User not found!' })
    }

    // Attach the decoded user to the request for future use
    req.user = user

    // Pass control to the next middleware in the chain
    next()
  } catch (error) {
    console.error('Authentication error:', error)
    if (error.name === 'JsonWebTokenError') {
      // In case of an error (e.g. invalid token), send a 401 Unauthorized response
      return res.status(401).json({ message: 'Invalid token!' })
    }
    // For unknown errors, send a 500 Internal Server Error response
    res.status(500).json({ message: 'Internal server error during authentication!' })
  }
}
