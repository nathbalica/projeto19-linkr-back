import Joi from "joi";

export const commentSchema = Joi.object({
    content: Joi.string().required().messages({
        "any.required": "Content is required",
        "string.empty": "Content cannot be empty",
    })
});
