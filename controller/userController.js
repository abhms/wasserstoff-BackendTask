import { User } from "../models/user.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // Check if all required fields are provided
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new user instance
    const newUser = new User({ fullName, email, password, role });

    // Save the new user to the database
    await newUser.save();

    // Respond with the created user
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // Handle errors
    if (error.code === 11000 && error.keyPattern.email) {
      return res.status(409).json({ message: "Email already used" });
    }
    res.status(400).json({ message: error.message });
  }
};

// User login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    // Respond with the token
    res.status(200).json({ token });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
};


