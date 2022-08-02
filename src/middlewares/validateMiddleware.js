import signinSchema from "../database/models/signinSchema.js";
import signupSchema from "../database/models/signupSchema.js";
import urlSchema from "../database/models/urlSchema.js";

const schemas = {
    signin: signinSchema,
    signup: signupSchema,
    urls: urlSchema
}

export default async function validateEntry(req, res, next) {
  const schema = schemas[res.locals.reqPath];
  const validationData = res.locals.cleanData;
  try {
    const response = await schema.validateAsync(validationData, {
      abortEarly: false,
    });
    res.locals.dbData = Object.entries(response);
    next();
  } catch (err) {
    const errMessage = err.details.map(res=>res.message.replaceAll("\"", "").replace('confirmPassword must be [ref:password]',"password does not match"));
    res.status(422).send(errMessage);
    return;
  }
}
