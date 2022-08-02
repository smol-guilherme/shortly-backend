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
  const validationData = res.locals.cleanData;
  try {
    const response = await schema.validateAsync(validationData, {
      abortEarly: false,
    });
    res.locals.dbData = Object.entries(response);
    next();
  } catch (err) {
    const errMessage = err.details.map(res=>res.message.replaceAll("\"", "").replace('confirmPassword must be [ref:password]',"password does not match"));
    console.log(errMessage);
    res.status(422).send(errMessage);
    return;
  }
}
