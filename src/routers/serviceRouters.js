import { Router } from "express";
import { shortenUrl } from "../controllers/serviceControllers.js";
import { handleValidate } from "../handlers/validationHandler.js";
import { getUser } from "../controllers/userControllers.js"
import { aggregateData } from "../middlewares/dataAggregationMiddleware.js";
import clearData from "../middlewares/stringStripMiddleware.js";
import validateEntry from "../middlewares/validateMiddleware.js";

const serviceRouter = Router();

serviceRouter.get('/:id', handleValidate, aggregateData, clearData, validateEntry);
serviceRouter.get('/open/:shortUrl');
serviceRouter.post('/shorten', aggregateData, clearData, validateEntry, shortenUrl);
// serviceRouter.post('/shorten', getUser, aggregateData, clearData, validateEntry, shortenUrl);
serviceRouter.delete('/:id');

export default serviceRouter;