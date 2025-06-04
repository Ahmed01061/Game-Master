import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import AppError from "../utils/appError.js";

const authentication = async (req, res, next) => {
  const { token } = req.headers;

  if (!token)
    return next(new AppError("token is not exist || must login", 401));

  /* Verify Token */

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //   console.log(decoded);

  /* Check if payload || if token is not valid " signature " */
  if (!decoded.id) return next(new AppError("invalid token", 401));

  /* Check If User Exist */

  const user = await UserModel.findById({ _id: decoded.id });

  if (!user) return next(new AppError("user is not exist", 404));

  req.user = user;

  next();
};

export default authentication;
