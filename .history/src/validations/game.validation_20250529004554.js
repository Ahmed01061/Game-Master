// middlewares/gameValidator.js
import { body } from "express-validator";

export const validateCreateGame = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("platform").notEmpty().withMessage("Platform is required"),

  body("genre")
    .notEmpty()
    .withMessage("Genre is required")
    .isIn(["Action", "Adventure", "RPG", "Puzzle", "Sports", "Strategy"])
    .withMessage("Genre must be one of the allowed values"),
];
