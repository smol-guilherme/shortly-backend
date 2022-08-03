import { Router } from "express";
import { shortenUrl } from "../controllers/serviceControllers.js";
import { handleValidate } from "../handlers/validationHandler.js";
import { getUser } from "../controllers/userControllers.js"
import clearData from "../middlewares/stringStripMiddleware.js";
import validateEntry from "../middlewares/validateMiddleware.js";

const userRouter = Router();

userRouter.use(handleValidate)
userRouter.get('/ranking');
userRouter.get('/users/me');

export default userRouter;