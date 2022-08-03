import { Router } from "express";
import { handleValidate } from "../handlers/validationHandler.js";
import { getRankings, getUser, getUserData } from "../controllers/userControllers.js"

const userRouter = Router();

userRouter.get('/ranking', handleValidate, getRankings);
userRouter.get('/users/me', handleValidate, getUser, getUserData);

export default userRouter;