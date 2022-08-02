import Joi from "joi";

const signinSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(1).required()
});

export default signinSchema;