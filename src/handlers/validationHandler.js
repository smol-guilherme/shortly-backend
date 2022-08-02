import { tokenMatch } from "./tokenHandler.js";

export function handleValidate(req, res, next) {
    res.locals.reqPath = req.path.replaceAll(/\//g, " ").replace(/[0-9]+/, "").replaceAll(/\B\s/g,"").trim().split(" ")[0];
    const token = tokenMatch(req.headers.authorization);
    if(req.headers.hasOwnProperty("authorization") && !token) {
        res.status(401).send();
        return;
    }
    res.locals.dbData = token;
    next();
}