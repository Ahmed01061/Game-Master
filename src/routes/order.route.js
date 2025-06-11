import { Router } from "express";
import {
  createOrder,
  getLoggedUserOrder,
} from "../controllers/order.controller.js";
import authentication from "../middlewares/authentication.js";
import catchError from "../middlewares/catchError.js";
import validation from "../middlewares/validation.js";
import { validateOrder } from "../validations/orderValidation.js";

const orderRouter = Router();

orderRouter.get("/", authentication, catchError(getLoggedUserOrder));
orderRouter.post(
  "/:cartId",
  authentication,
  validateOrder,
  validation,
  catchError(createOrder)
);

export default orderRouter;
