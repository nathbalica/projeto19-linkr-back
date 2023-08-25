import { Router } from "express";
import authRouter from "./auth.routes.js";
import postsRouter from "./posts.routes.js";
import userRouter from "./users.routes.js";
import hashtagsRouter from "./hashtag.routes.js";
import followRouter from "./follow.routes.js";
import commentsRouter from "./comments.routes.js";

const router = Router();

router.use(authRouter);
router.use(postsRouter);
router.use(userRouter);
router.use(hashtagsRouter);
router.use(followRouter);
router.use(commentsRouter);

export default router;
