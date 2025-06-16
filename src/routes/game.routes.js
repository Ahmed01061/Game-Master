import { Router } from "express";
import {
  createGame,
  deleteGame,
  getGame,
  getGames,
  updateGame,
} from "../controllers/game.controller.js";
import authentication from "../middlewares/authentication.js";
import authorization from "../middlewares/authorization.js";
import catchError from "../middlewares/catchError.js";
import validation from "../middlewares/validation.js";
import uploadFileDisk from "../utils/local.multer.js";
import {
  validateCreateGame,
  validateDeleteGame,
  validateUpdateGame,
} from "../validations/game.validation.js";

const gameRouter = Router();

/* ======== End Point Get Game ========  */

/* ======== Gat Games ======== */

gameRouter.get("/", getGames);

/* ======== Gat Game ======== */

gameRouter.get("/:gameId", getGame);

/* ======== End Point Create Game ========  */
gameRouter.post(
  "/",
  uploadFileDisk().single("coverImage"),
  authentication,
  authorization,
  validateCreateGame,
  validation,
  catchError(createGame)
);

/* ======== End Point Update Game ========  */
gameRouter.put(
  "/:id",
  uploadFileDisk().single("coverImage"),
  authentication,
  authorization,
  validateUpdateGame,
  validation,
  catchError(updateGame)
);

/* ======== End Point Delete Game ========  */
gameRouter.delete(
  "/:id",
  authentication,
  authorization,
  validateDeleteGame,
  validation,
  catchError(deleteGame)
);

export default gameRouter;
