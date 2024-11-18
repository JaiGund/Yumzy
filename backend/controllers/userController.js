import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Create token with user ID and name
const createToken = (id, name) => {
  return jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: "7d" }); // Optional: Add token expiry
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = createToken(user._id, user.name); // Include user's name in the token
    res.json({ success: true, token, name: user.name }); // Send user's name in the response
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Checking if email already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User Already Exists" });
    }

    // Checking if email is valid
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Checking if password is strong enough
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating a new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id, user.name); // Include user's name in the token
    res.json({ success: true, token, name: user.name }); // Send user's name in the response
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };
