export function aggregateData(req, res, next) {
  const reqParams = {
    0: "body",
    1: "params",
    2: "query"
  }

  const data = [];

  for (const key in reqParams) {
    if(Object.entries(req[reqParams[key]]).length > 0) {
      data.push(req[reqParams[key]])
    }
  }
  res.locals.reqData = data;
  next();
}
