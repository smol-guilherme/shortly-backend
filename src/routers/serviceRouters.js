import { Router } from "express";
import { getShortUrl, redirectByShortUrl, shortenUrl } from "../controllers/serviceControllers.js";
import { handleValidate } from "../handlers/validationHandler.js";
import { getUser } from "../controllers/userControllers.js"
import { aggregateData } from "../middlewares/dataAggregationMiddleware.js";
import clearData from "../middlewares/stringStripMiddleware.js";
import validateEntry from "../middlewares/validateMiddleware.js";

const serviceRouter = Router();

serviceRouter.get('/urls/:id', handleValidate, aggregateData, clearData, validateEntry, getShortUrl);
serviceRouter.get('/urls/open/:shortUrl', handleValidate, aggregateData, clearData, validateEntry, redirectByShortUrl);
serviceRouter.post('/urls/shorten', handleValidate, getUser, aggregateData, clearData, validateEntry, shortenUrl);
serviceRouter.delete('/urls/:id');

export default serviceRouter;