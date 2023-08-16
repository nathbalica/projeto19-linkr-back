import { Router } from "express"
import { validateSchema } from "../middlewares/validateSchema.middlewares.js"
import { signUp, signIn } from "../controllers/auth.controller.js"
import { signupSchema, signinSchema } from "../schemas/users.schemas.js"

const authRouter = Router()

authRouter.post("/signup", validateSchema(signupSchema), signUp)
authRouter.post("/signin", validateSchema(signinSchema), signIn)

export default authRouter