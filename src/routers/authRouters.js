import { Router } from "express";
import { handleValidate } from "../handlers/validationHandler.js";
import validateEntry from "../middlewares/validateMiddleware.js";

const authRouter = Router();

authRouter.use(handleValidate);
authRouter.use(validateEntry);
authRouter.post('/signup');
authRouter.post('/signin');

export default authRouter;