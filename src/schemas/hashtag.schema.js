import Joi from "joi";

const hashtagSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Hashtag name is required",
        "string.empty": "Hashtag name cannot be empty",
    }),
});

export default hashtagSchema;
