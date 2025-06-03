import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateJWT from "../utils/generateJWT.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    const token = generateJWT({
      email: newUser.email,
      role: newUser.role,
      _id: newUser._id,
    });
    if (!token) {
      throw new Error("Failed to generate token");
    }
    newUser.token = token;
    await newUser.save();
    const userObject = newUser.toObject();
    delete userObject.password;
    res.status(201).json({
      status: "Created",
      data: { userObject },
    });
  } catch (error) {
    const statusCode = error.message === "User already exists" ? 400 : 500;
    res.status(statusCode).json({
      status: "Failed",
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Password");
    }
    const token = generateJWT({ email, role: user.role, _id: user.id });
    res.json({
      status: "Success",
      data: {
        token: token,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: "Unauthorized",
      message: error.message,
    });
  }
};