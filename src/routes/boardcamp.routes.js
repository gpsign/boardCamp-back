import { Router } from "express";
import {
	getCustomerById,
	getCustomers,
	getGames,
	postGame,
} from "../controllers/boardcamp.controller.js";

const boardcampRouter = Router();

boardcampRouter.get("/games", getGames);
boardcampRouter.post("/games", postGame);

boardcampRouter.get("/customers", getCustomers);
boardcampRouter.get("/customers/:id", getCustomerById);

export default boardcampRouter;
