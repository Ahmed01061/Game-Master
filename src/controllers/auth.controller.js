import bcrypt from "bcryptjs";
import UserModel from "../models/userModel.js";
import AppError from "../utils/appError.js";
import generateJWT from "../utils/generateJWT.js";

/* ==================== Register ==================== */

export const register = async (req, res, next) => {
  const { userName, email, password } = req.body;

  const userIsExist = await UserModel.findOne({ email, password });
  if (userIsExist) {
    return next(new AppError("user already exist", 409));
  }

  const hashPassword = bcrypt.hashSync(password, 8);

  const user = await UserModel.create({
    userName,
    email,
    password: hashPassword,
  });

  res.status(200).json({ message: "success", user });
};

/* ==================== Login ==================== */
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    return next(new AppError("user is not exist", 404));
  }

  const match = bcrypt.compareSync(password, user.password);
  if (!match) {
    return next(new AppError("invalid email or password", 400));
  }

  const token = generateJWT({
    id: user._id,
    userName: user.userName,
    email: user.email,
  });

  return res.status(200).json({ message: "success", token });
};
