import { Router } from "express";
import { getGames, postGame } from "../controllers/boardcamp.controller.js";

const boardcampRouter = Router();

boardcampRouter.get("/games", getGames);
boardcampRouter.post("/games", postGame);

export default boardcampRouter;
