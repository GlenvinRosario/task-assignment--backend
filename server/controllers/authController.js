const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require('axios');

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "Username or Email already exists!" });
    }

    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password, salt); 

    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("Login request received:", req.body);
  
      const user = await User.findOne({ email });
      console.log("User found in DB:", user);
  
      if (!user) {
        console.log("User not found!");
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        console.log("Password does NOT match!");
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
      console.log("Token generated:", token);
      res.json({ token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(400).json({ error: error.message });
    }
  };
  
  
  