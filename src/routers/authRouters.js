import { Router } from "express";
import { handleValidate } from "../handlers/validationHandler.js";
import encryptData from "../middlewares/encryptionMiddleware.js";
import clearData from "../middlewares/stringStripMiddleware.js";
import validateEntry from "../middlewares/validateMiddleware.js";
import { registerUser } from "../controllers/userControllers.js";

const authRouter = Router();

authRouter.use(handleValidate);
authRouter.use(clearData)
authRouter.use(validateEntry);
authRouter.post('/signup', encryptData, registerUser);
authRouter.post('/signin');

export default authRouter;