
export function handleValidate(req, res, next) {
    res.locals.reqPath = req.path.replaceAll(/\//g, " ").replace(/[0-9]+/, "").replaceAll(/\B\s/g,"").trim().split(" ")[0];
    next();
}