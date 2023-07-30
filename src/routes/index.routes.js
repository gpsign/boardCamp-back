import { Router } from "express";
import boardcampRouter from "./boardcamp.routes.js";

const router = Router();

router.use(boardcampRouter);

export default router;
