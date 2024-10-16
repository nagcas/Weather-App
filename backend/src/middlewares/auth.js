import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Configuring dotenv to load environment variables from the .env file
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) return res.send("Access Denied. Token not provied.").status(401);

  // extracting bearer token from header
  token = authorization.split(" ")[1];

  try {
    // verify the token
    const result = jwt.verify(token, SECRET_KEY);
    req.userId = result._id;
    next();
  } catch (error) {
    return res.send("Access Denied. Invalid token.").status(401);
  }
};

export default authMiddleware;

