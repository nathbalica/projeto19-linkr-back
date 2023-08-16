import Joi from "joi";

export const urlSchema = Joi.object({
  url: Joi.string().uri().required().messages({
    "string.base": "URL must be a string",
    "string.empty": "URL cannot be empty",
    "string.uri": "Invalid URL format",
    "any.required": "URL is required",
  })
})