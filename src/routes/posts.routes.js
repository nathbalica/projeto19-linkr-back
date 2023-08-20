import { Router } from "express";
import {
    publish,
    editPostController,
    removePostController,
    likeController,
    dislikeController,
} from "../controllers/posts.controller.js";
import { validateAuth } from "../middlewares/auth.middlewares.js";
import { publishPostSchema } from "../schemas/auth.schemas.js";
import { validateSchema } from "../middlewares/validateSchema.middlewares.js";

const postsRouter = Router();

postsRouter.post(
    "/publish",
    [validateAuth, validateSchema(publishPostSchema)],
    publish
);
postsRouter.put("/edit/:post_id", validateAuth, editPostController);
postsRouter.delete("/remove/:post_id", validateAuth, removePostController);
postsRouter.post("/like/:post_id", validateAuth, likeController);
postsRouter.delete("/like/:post_id", validateAuth, dislikeController);

export default postsRouter;
