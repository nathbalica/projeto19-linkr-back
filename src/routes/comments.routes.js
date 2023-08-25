import { Router } from "express"
import { validateSchema } from "../middlewares/validateSchema.middlewares.js"
import { postCommentController, getCommentsController } from "../controllers/comments.controller.js"
import { commentSchema } from "../schemas/comment.schema.js"
import { validateAuth } from "../middlewares/auth.middlewares.js"
const commentsRouter = Router()

commentsRouter.post(
    "/comments/:post_id",
    [validateAuth, validateSchema(commentSchema)],
    postCommentController
);
commentsRouter.get("/comments/:post_id", validateAuth, getCommentsController);

export default commentsRouter