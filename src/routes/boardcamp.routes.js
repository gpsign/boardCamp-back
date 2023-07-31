import { Router } from "express";
import {
	getCustomerById,
	getCustomers,
	getGames,
	getRentals,
	postCustomer,
	postGame,
	updateCustomer,
} from "../controllers/boardcamp.controller.js";

const boardcampRouter = Router();

boardcampRouter.get("/games", getGames);
boardcampRouter.post("/games", postGame);

boardcampRouter.get("/customers", getCustomers);
boardcampRouter.get("/customers/:id", getCustomerById);
boardcampRouter.post("/customers", postCustomer);
boardcampRouter.put("/customers/:id", updateCustomer);

boardcampRouter.get("/rentals", getRentals);


export default boardcampRouter;
