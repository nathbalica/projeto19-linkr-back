import Joi from "joi";

const postSchema = Joi.object({
    content: Joi.string().required().messages({
        "any.required": "Content is required",
        "string.empty": "Content cannot be empty",
    }),
    link: Joi.string().uri().allow("").messages({
        "string.uri": "Link must be a valid URL",
    }),
});

export default postSchema;
