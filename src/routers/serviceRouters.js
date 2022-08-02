import { Router } from "express";
import { shortenUrl } from "../controllers/serviceControllers.js";
import { handleValidate } from "../handlers/validationHandler.js";
import { getUser } from "../controllers/userControllers.js"
import clearData from "../middlewares/stringStripMiddleware.js";
import validateEntry from "../middlewares/validateMiddleware.js";

const serviceRouter = Router();

serviceRouter.get('/urls/:id');
serviceRouter.get('/urls/open/:shortUrl');
serviceRouter.post('/urls/shorten', handleValidate, getUser, clearData, validateEntry, shortenUrl);
serviceRouter.delete('/urls/:id');

export default serviceRouter;