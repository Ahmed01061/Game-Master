import { body } from "express-validator";

export const registerValidation = [
  body("userName")
    .notEmpty()
    .withMessage("User name is required form express validator")
    .isLength({ min: 3 })
    .withMessage(
      "User name must be at least 3 characters form express validator"
    ),

  body("email")
    .notEmpty()
    .withMessage("Email is required form express validator")
    .isEmail()
    .withMessage("Invalid email format form express validator"),

  body("password")
    .notEmpty()
    .withMessage("Password is required form express validator")
    .isLength({ min: 3 })
    .withMessage(
      "Password must be at least 3 characters form express validator"
    ),
];

export const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required form express validator")
    .isEmail()
    .withMessage("Invalid email format form express validator"),

  body("password")
    .notEmpty()
    .withMessage("Password is required form express validator")
    .isLength({ min: 3 })
    .withMessage(
      "Password must be at least 3 characters form express validator"
    ),
];
