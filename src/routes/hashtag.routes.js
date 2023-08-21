import { Router } from "express";
import {
    createPostHashtags,
    getTrendingHashtagsController,
    getPostsByHashtagController,
} from "../controllers/hashtags.controller.js";
import { validateAuth } from "../middlewares/auth.middlewares.js";
import { validateSchema } from "../middlewares/validateSchema.middlewares.js";
import hashtagSchema from "../schemas/hashtag.schema.js";

const hashtagsRouter = Router();

hashtagsRouter.post(
    "/create",
    [validateAuth, validateSchema(hashtagSchema)],
    createPostHashtags
);
hashtagsRouter.get("/trending", getTrendingHashtagsController);
hashtagsRouter.get("/hashtag/:hashtag", getPostsByHashtagController);

export default hashtagsRouter;
