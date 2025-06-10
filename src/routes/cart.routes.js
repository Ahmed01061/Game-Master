import { Router } from "express";
import {
  addToCart,
  getLoggedUserCart,
} from "../controllers/cart.controller.js";
import authentication from "../middlewares/authentication.js";

const cartRouter = Router();

/* =========== Add Product To Cart ============ */

cartRouter.post("/", authentication, addToCart);

cartRouter.get("/", authentication, getLoggedUserCart);

export default cartRouter;
