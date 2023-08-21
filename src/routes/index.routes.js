import { Router } from "express";
import authRouter from "./auth.routes.js";
import postsRouter from "./posts.routes.js";
import userRouter from "./users.routes.js";
import hashtagsRouter from "./hashtag.routes.js";

const router = Router();

router.use(authRouter);
router.use(postsRouter);
router.use(userRouter);
router.use(hashtagsRouter);

export default router;
