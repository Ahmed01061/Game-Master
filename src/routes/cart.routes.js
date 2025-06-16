import { Router } from "express";
import {
  addToCart,
  clearCart,
  deleteCartGame,
  getLoggedUserCart,
  updateQuantity,
} from "../controllers/cart.controller.js";
import authentication from "../middlewares/authentication.js";

const cartRouter = Router();

/* =========== Add Game To Cart ============ */

cartRouter.post("/", authentication, addToCart);

cartRouter.get("/", authentication, getLoggedUserCart);

/* ========== Update Game Quantity ============ */

cartRouter.patch("/:id", authentication, updateQuantity);

/* ========== Update Game Quantity ========== */

cartRouter.delete("/:id", authentication, deleteCartGame);

/* ========== Clear Cart ========== */
cartRouter.put("/:id", authentication, clearCart);

export default cartRouter;
