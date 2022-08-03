import signinSchema from "../database/models/signinSchema.js";
import signupSchema from "../database/models/signupSchema.js";
import urlSchema from "../database/models/urlSchema.js";
import idSchema from "../database/models/idSchema.js";

const schemas = {
  signin: signinSchema,
  signup: signupSchema,
  urls: urlSchema,
  id: idSchema,
};

export default async function validateEntry(req, res, next) {
  const validationData = res.locals.cleanData;
  for (const index in validationData) {
    try {
      const schema = schemas[setSchema(validationData[index])];
      const response = await schema.validateAsync(validationData[index], {
        abortEarly: false,
      });
      res.locals.dbData = Object.entries(response);
    } catch (err) {
      const errMessage = err.details.map((res) =>
        res.message
          .replaceAll('"', "")
          .replace(
            "confirmPassword must be [ref:password]",
            "password does not match"
          )
      );
      res.status(422).send(errMessage);
      return;
    }
  }
  next();
}

function setSchema(objectData) {
  const keys = Object.keys(objectData);
  for (let i = 0; i < keys.length; i++) {
    switch (keys[i]) {
      case "confirmPassword":
        return "signup";
      case "id":
        return "id";
      case "url":
        return "url";
      case "shortUrl":
        return "shortUrl";
      default:
        break;
    }
  }
  return "signin";
}
