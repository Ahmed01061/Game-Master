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

/* ======== End Point Update Game ========  */
gameRouter.put(
  "/:id",
  uploadFileDisk().single("coverImage"),
  validateUpdateGame,
  validation,
  updateGame
);

/* ======== End Point Delete Game ========  */
gameRouter.delete("/:id", validateDeleteGame, validation, deleteGame);

export default gameRouter;
