import { Router } from "express";
import { handleValidate } from "../handlers/validationHandler.js";
import validateEntry from "../middlewares/validateMiddleware.js";

const serviceRouter = Router();

serviceRouter.get('/urls/:id');
serviceRouter.get('/urls/open/:shortUrl');
serviceRouter.post('/urls/shorten', handleValidate, validateEntry);
serviceRouter.delete('/urls/:id');

export default serviceRouter;