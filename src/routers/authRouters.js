import { Router } from "express";
import { handleValidate } from "../handlers/validationHandler.js";
import { registerUser, userLogin } from "../controllers/userControllers.js";
import { encryptData } from "../middlewares/authMiddleware.js";
import clearData from "../middlewares/stringStripMiddleware.js";
import validateEntry from "../middlewares/validateMiddleware.js";

const authRouter = Router();

authRouter.use(handleValidate);
authRouter.use(clearData)
authRouter.use(validateEntry);
authRouter.post('/signup', encryptData, registerUser);
authRouter.post('/signin', userLogin);

export default authRouter;