import { body } from "express-validator";

export const validateUserRegistration = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required.")
        .isLength({
            min: 3,
            max: 50,
        })
        .withMessage("Name must be between 3 and 50 characters."),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Please provide a valid email.")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required.")
        .isLength({
            min: 8,
        })
        .withMessage("Password must be at least 8 characters long.")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter.")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter.")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number.")
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage("Password must contain at least one special character."),
];


export const validateUserLogin = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Invalid email."),

    body("password")
        .notEmpty()
        .withMessage("Password is required."),
];