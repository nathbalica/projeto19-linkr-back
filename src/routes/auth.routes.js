import { Router } from "express"
import { validateSchema } from "../middlewares/validateSchema.middlewares.js"
import { signUp, signIn, logout } from "../controllers/auth.controller.js"
import { signupSchema, signinSchema } from "../schemas/auth.schemas.js"
import { validateAuth } from "../middlewares/auth.middlewares.js"
const authRouter = Router()

authRouter.post("/signup", validateSchema(signupSchema), signUp)
authRouter.post("/signin", validateSchema(signinSchema), signIn)
authRouter.post("/logout", validateAuth, logout)

export default authRouter