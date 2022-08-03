import Joi from "joi";

const isSchema = Joi.object({
    id: Joi.number().min(1).required(),
});

export default isSchema;