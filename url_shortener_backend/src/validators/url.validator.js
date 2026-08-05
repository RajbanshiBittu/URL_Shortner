import Joi from "joi";


// Create Short URL Validation Schema
export const createShortUrlSchema = Joi.object({
    originalUrl:Joi.string()
        .trim()
        .max(2048)
        .uri({
            scheme:["http","https"]
        })
        .required()
        .messages({
            "string.base":
            "Original URL must be a string.",

            "string.empty":
            "Original URL is required.",

            "string.uri":
            "Please provide a valid URL.",

            "string.max":
            "URL is too long.",

            "any.required":
            "Original URL is required."
        })
});


// Update URL Validation Schema
export const updateUrlSchema = Joi.object({

    originalUrl: Joi.string()
        .uri({
            scheme:["http","https"]
        })
        .optional(),

    isActive:Joi.boolean()
        .optional(),

    expiresAt:Joi.date()
        .greater("now")
        .optional()

})
.min(1)
.messages({
    "object.min":
    "Please provide at least one field to update."
});