import { Router } from "express";
import { getUsers } from "../controllers/user.controller.js";
import catchError from "../middlewares/catchError.js";

const userRouter = Router();

/* ============ Get Users ============ */

userRouter.get("/", catchError(getUsers));

export default userRouter;
