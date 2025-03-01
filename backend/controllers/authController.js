import User from "../models/User.js"; // Ensure correct import
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User Registration
export const register = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    email = email.toLowerCase().trim(); // Normalize email input

    // Check if user already exists
    const existingUser = await User.findOne({ email }); // FIXED: Use "User" instead of "users"
    if (existingUser)
      return res.status(400).json({ message: "Email is already registered" });

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user in "users" collection
    const newUser = new User({
      username: username.trim(),
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};

// User Login
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase().trim(); // Normalize email input

    // Check if user exists in "users" collection
    const user = await User.findOne({ email }); // FIXED: Use "User" instead of "users"
    if (!user) return res.status(404).json({ message: "User not found" });

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid email or password" });

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in",
      error: error.message,
    });
  }
};
