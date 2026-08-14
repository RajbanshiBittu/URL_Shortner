import Joi from "joi";

export const validateUserRegistration = Joi.object({

    name: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.base": "Name must be a string.",
            "string.empty": "Name is required.",
            "string.min":
                "Name must be at least 3 characters long.",
            "string.max":
                "Name must not exceed 50 characters.",
            "any.required":
                "Name is required.",
        }),

    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            "string.base": "Email must be a string.",
            "string.empty": "Email is required.",
            "string.email":
                "Please provide a valid email.",
            "any.required":
                "Email is required.",
        }),

    password: Joi.string()
        .min(8)
        .pattern(/[A-Z]/)
        .pattern(/[a-z]/)
        .pattern(/[0-9]/)
        .pattern(/[!@#$%^&*(),.?":{}|<>]/)
        .required()
        .messages({
            "string.base":
                "Password must be a string.",

            "string.empty":
                "Password is required.",

            "string.min":
                "Password must be at least 8 characters long.",

            "string.pattern.base":
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",

            "any.required":
                "Password is required.",
        }),
});


export const validateUserLogin = Joi.object({

    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            "string.base":
                "Email must be a string.",

            "string.empty":
                "Email is required.",

            "string.email":
                "Please provide a valid email.",

            "any.required":
                "Email is required.",
        }),

    password: Joi.string()
        .required()
        .messages({
            "string.base":
                "Password must be a string.",

            "string.empty":
                "Password is required.",

            "any.required":
                "Password is required.",
        }),
});