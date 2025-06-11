import { Router } from "express";
import * as userController from "../controllers/auth.controller.js";
import validation from "../middlewares/validation.js";
import {
  loginValidation,
  registerValidation,
} from "../validations/authValidation.js";

import catchError from "../middlewares/catchError.js";

const authRouter = Router();
authRouter.post(
  "/register",
  registerValidation,
  validation,
  catchError(userController.register)
);
authRouter.post(
  "/login",
  loginValidation,
  validation,
  catchError(userController.login)
);

export default authRouter;
