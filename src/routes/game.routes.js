import { Router } from "express";
import { getGames } from "../controllers/game.controller.js";

const gameRouter = Router();

gameRouter.get("/", getGames);

export default gameRouter;
