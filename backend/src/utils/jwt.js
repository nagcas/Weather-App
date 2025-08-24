import jwt from 'jsonwebtoken'

// Function to generate a JSON Web Token (JWT)
export const generateJWT = (payload) => {
  // Returns a new Promise which resolves or rejects depending on the result of the token signing
  return new Promise((resolve, reject) =>
    // Sign the JWT token with the given payload, secret key, and expiration option
    jwt.sign(
      // Data to include in the token
      payload,
      // Secret key used to sign the token, taken from environment variables for security
      process.env.JWT_SECRET,
      // Option specifying that the token will expire after 1 day
      { expiresIn: '1 day' },
      // Callback executed when the token signing is completed
      (err, token) => {
        // If there is an error during token signing, reject the Promise with the error
        if (err) reject(err)
        // Otherwise, resolve the Promise with the generated token
        else resolve(token)
      }
    )
  )
}

// Export the verifyJWT function which verifies a JWT token
export const verifyJWT = (token) => {
  // Returns a new Promise to handle the operation asynchronously
  return new Promise((resolve, reject) =>
    // Uses jwt's verify method to decode and verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      // If there is an error during verification, reject the Promise with the error
      if (err) reject(err)
      // Otherwise, resolve the Promise with the decoded payload
      else resolve(decoded)
    })
  )
}
