import Joi from "joi";

const uriSchema = Joi.object({
    url: Joi.string().uri().required(),
});

export default uriSchema;