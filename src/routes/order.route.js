import { Router } from "express";
import { createOrder } from "../controllers/order.controller.js";
import catchError from "../middlewares/catchError.js";
import validation from "../middlewares/validation.js";
import authentication from "../middlewares/authentication.js";

const orderRouter = Router();

/* ============ Get Users ============ */

orderRouter.post("/:cartId", authentication, validation, catchError(createOrder));

export default orderRouter;