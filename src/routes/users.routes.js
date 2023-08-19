import { Router } from "express";
import { validateAuth } from "../middlewares/auth.middlewares.js";
import { getTimeline, getUserById } from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/user/:user_id", getUserById);
usersRouter.get("/timeline", validateAuth, getTimeline);

export default usersRouter;
