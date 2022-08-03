import { stripHtml } from "string-strip-html";

export default function clearData(req, res, next) {
  const data = res.locals.reqData;
  const output = [...data];
  for(const object in data) {
    for (const param in object) {
      if (typeof output[param] === "string") {
        output[object] = stripHtml(data[param]).result.trim();
      }
    }
  }
  res.locals.cleanData = output;
  next();
};