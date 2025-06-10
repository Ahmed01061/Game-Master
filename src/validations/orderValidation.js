import { body } from "express-validator";

export const validateOrder = [
  body("shoppingAddress")
    .notEmpty()
    .withMessage("Shopping address is required"),

  body("shoppingAddress.city")
    .notEmpty()
    .withMessage("City is required")
    .isString()
    .withMessage("City must be a string"),

  body("shoppingAddress.street")
    .notEmpty()
    .withMessage("Street is required")
    .isString()
    .withMessage("Street must be a string"),

  body("shoppingAddress.phone")
    .notEmpty()
    .withMessage("Phone is required")
    .isMobilePhone()
    .withMessage("Invalid phone number"),

  body("paymentMethod")
    .notEmpty()
    .withMessage("Payment method is required")
    .isIn(["cash", "credit", "paypal"])
    .withMessage("Invalid payment method"),
];
