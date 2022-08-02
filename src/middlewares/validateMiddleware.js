import signinSchema from "../database/models/signinSchema.js";
import signupSchema from "../database/models/signupSchema.js";
import uriSchema from "../database/models/uriSchema.js";

const schemas = {
    signin: signinSchema,
    signup: signupSchema,
    urls: uriSchema
}

export default async function validateEntry(req, res, next) {
  const schema = schemas[res.locals.reqPath];
  const validationData = res.locals.validationData || {};
  try {
    for (const data of validationData) {
      const response = await invokeValidation(data, res.locals.reqPath);
    }
    next();
  } catch (err) {
    res.status(422).send(err.details[0].message);
    return;
  }
}

async function invokeValidation(data, schema) {
  const res = await schema.validateAsync(data, {
    abortEarly: false,
  });
  return res;
}
