import express from "express";
import * as userController from "../controllers/user.controller.js";
import validation from "../middlewares/validation.js";
import {
  registerValidation,
  loginValidation,
} from "../validations/authValidation.js";

const userRouter = express.Router();
userRouter.post(
  "/register",
  registerValidation,
  validation,
  userController.register
);
userRouter.post("/login", loginValidation, validation, userController.login);

export default userRouter;
