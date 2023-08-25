import { followUser, unfollowUser, isFollowing } from "../controllers/follow.controller.js";
import { Router } from "express";
import { validateAuth } from "../middlewares/auth.middlewares.js"

const followRouter = Router();

followRouter.post("/follow/:user_id", validateAuth, followUser);
followRouter.post("/unfollow/:user_id", validateAuth, unfollowUser);
followRouter.get("/is-following/:user_id", validateAuth, isFollowing);


export default followRouter;
