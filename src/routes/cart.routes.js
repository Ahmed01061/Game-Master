import { Router } from "express";
import {
  addToCart,
  getLoggedUserCart,
} from "../controllers/cart.controller.js";
import authentication from "../middlewares/authentication.js";

const cartRouter = Router();

/* =========== Add Product To Cart ============ */

cartRouter.post("/", authentication, addToCart);

// /* ========== Update Product Quantity ============ */

// cartRouter.put(
//   "/:id",
//   protectedRoute,
//   validation(updateCartValidation),
//   updateQuantity
// );

// /* ========== Delete Product From Cart ============ */

// cartRouter.delete("/:id", protectedRoute, deleteCartProduct);

// //* ========== Get User Cart ============ */

// cartRouter.put("/", protectedRoute, clearCart);

// /* ========== Get User Cart ============ */

cartRouter.get("/", authentication, getLoggedUserCart);

export default cartRouter;
