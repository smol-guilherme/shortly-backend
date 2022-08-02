import signinSchema from "../database/models/signinSchema.js";
import signupSchema from "../database/models/signupSchema.js";
import uriSchema from "../database/models/uriSchema.js";

const schemas = {
    signin: signinSchema,
    signup: signupSchema,
    url: uriSchema
}

export default async function validateEntry(req, res, next) {
  const validationData = res.locals.validationData || {};
  let queryDataArray = [];
  try {
    for (const data of validationData) {
      const response = await invokeValidation(data, res.locals.reqPath);
      queryDataArray = queryDataArray.concat(Object.values(response));
    }
    next();
  } catch (err) {
    if (
      err.details[0].type === "string.empty" ||
      err.details[0].type === "date.base"
    ) {
      res.status(400).send(err.details[0].message);
      return;
    }
    res.status(422).send(err.details[0].message);
    return;
  }
}

async function validate(data, schema) {
  const response = await schema.validateAsync(data, {
    abortEarly: false,
  });
  return response;
}
