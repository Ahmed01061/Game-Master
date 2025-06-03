import { Router } from "express";
import {
  createGame,
  getGames,
  updateGame,
  deleteGame,
} from "../controllers/game.controller.js";
import validation from "../middlewares/validation.js";
import uploadFileDisk from "../utils/local.multer.js";
import {
  validateCreateGame,
  validateUpdateGame,
  validateDeleteGame,
} from "../validations/game.validation.js";

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
  validateCreateGame,
  validation,
  updateGame
);

/* ======== End Point Delete Game ========  */
gameRouter.delete("/:id", validateDeleteGame, validation, deleteGame);

export default gameRouter;
