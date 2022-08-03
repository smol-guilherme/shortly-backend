import { Router } from "express";
import { shortenUrl } from "../controllers/serviceControllers.js";
import { handleValidate } from "../handlers/validationHandler.js";
import { getUser, getUserData } from "../controllers/userControllers.js"
import clearData from "../middlewares/stringStripMiddleware.js";
import validateEntry from "../middlewares/validateMiddleware.js";

const userRouter = Router();

userRouter.get('/ranking');
userRouter.get('/users/me', handleValidate, getUser, getUserData);

export default userRouter;