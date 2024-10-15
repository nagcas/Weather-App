import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Configuring dotenv to load environment variables from the .env file
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(404).send("User not found.");
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword)
      return res.send(400).json({ message: "Invalid Password." });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    );

    return res.status(200).json({ user: existingUser, token: token });
  } catch (error) {
    console.log("Error while logging in User: ", error);
    return res.status(500).send("Some error occured.");
  }
};

export default login;
