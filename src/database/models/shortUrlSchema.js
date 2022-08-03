import Joi from "joi";

const shortUrlSchema = Joi.object({
    shortUrl: Joi.string().min(12).required(),
});

export default shortUrlSchema;