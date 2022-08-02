import Joi from "joi";

const signupSchema = Joi.object({
    name: Joi.string().min(1).trim().required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(1).required(),
    confirmPassword: Joi.ref('password')
});

export default signupSchema;