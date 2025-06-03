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

export const validateUpdateGame = [
  param("id").isMongoId().withMessage("Invalid game ID"),

  body("title")
    .optional()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),

  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description cannot be empty")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),

  body("price")
    .optional()
    .notEmpty()
    .withMessage("Price cannot be empty")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("platform")
    .optional()
    .notEmpty()
    .withMessage("Platform cannot be empty"),

  body("genre")
    .optional()
    .notEmpty()
    .withMessage("Genre cannot be empty")
    .isIn(["Action", "Adventure", "RPG", "Puzzle", "Sports", "Strategy"])
    .withMessage("Genre must be one of the allowed values"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
];

export const validateDeleteGame = [
  param("id").isMongoId().withMessage("Invalid game ID"),
];
