import { Router } from "express";
import { createGame, getGames } from "../controllers/game.controller.js";
import validation from "../middlewares/validation.js";
import uploadFileDisk from "../utils/local.multer.js";
import { validateCreateGame } from "../validations/game.validation.js";

const gameRouter = Router();

/* ======== End Point Get Game ========  */

gameRouter.get("/", getGames);

/* ======== End Point Create Game ========  */
gameRouter.post(
  "/",
  uploadFileDisk().single("coverImage"),
  validateCreateGame,
  validation,
  createGame
);
export default gameRouter;
