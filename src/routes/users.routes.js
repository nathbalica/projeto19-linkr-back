import { Router } from "express";
import { validateAuth } from "../middlewares/auth.middlewares.js";
import { getTimeline, getUserById, getPostController } from "../controllers/users.controller.js";
import { searchUsersController } from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/user/:user_id", validateAuth, getUserById);
usersRouter.get("/search", searchUsersController);
usersRouter.get("/timeline/:page", validateAuth, getTimeline);
usersRouter.get("/post/:post_id", validateAuth, getPostController);

export default usersRouter;
