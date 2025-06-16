import { Router } from "express";
import {
  addToWishlist,
  clearLoggedUserWishlist,
  deleteProductFromWishlist,
  getLoggedUserWishList,
} from "../controllers/wishList.controller.js";
import authentication from "../middlewares/authentication.js";
import catchError from "../middlewares/catchError.js";

const wishListRouter = Router();

/* =========== Add Product To WishList ============ */

wishListRouter.post("/", authentication, catchError(addToWishlist));

/* ========== Delete Product From WishList ============ */

wishListRouter.delete(
  "/:id",
  authentication,
  catchError(deleteProductFromWishlist)
);

/* ========== Clear User WishList ============ */

wishListRouter.put("/", authentication, catchError(clearLoggedUserWishlist));

/* ========== Get User WishList ============ */

wishListRouter.get("/", authentication, getLoggedUserWishList);

export default wishListRouter;
