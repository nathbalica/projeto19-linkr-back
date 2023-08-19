import { Router } from "express";
import { publish, edit, remove } from "../controllers/posts.controller.js";
import { validateAuth } from "../middlewares/auth.middlewares.js";
import { publishPostSchema } from "../schemas/auth.schemas.js";
import { validateSchema } from "../middlewares/validateSchema.middlewares.js";

const postsRouter = Router();

postsRouter.post(
    "/publish",
    [validateAuth, validateSchema(publishPostSchema)],
    publish
);
postsRouter.put("/edit/:post_id", validateAuth, edit);
postsRouter.delete("/delete/:post_id", validateAuth, remove);

export default postsRouter;
