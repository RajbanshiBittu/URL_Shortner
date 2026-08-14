import express from "express";
import * as userController from "../controllers/user.controller.js";
import {
    validateUserRegistration,
    validateUserLogin,
} from "../validators/user.validator.js";
import { validate } from "../middlewares/validation.middleware.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";



const router = express.Router();

/* ---------------------------------- Public Endpoints ---------------------------------------- */


// POST /api/auth/register
// Register a new user
router.post(
    "/register",
    validate(validateUserRegistration),
    userController.registerUser
);


// POST /api/auth/login
// Authenticate user
router.post(
    "/login",
    validate(validateUserLogin),
    userController.loginUser
);

/* -------------------------------------------------------------------------- */
/*                             Protected Endpoints                            */
/* -------------------------------------------------------------------------- */


// GET /api/auth/profile
// Get logged-in user's profile
router.get(
    "/profile",
    authenticateUser,
    userController.getUserProfile
);


// PATCH /api/auth/profile
// Update logged-in user's profile
router.patch(
    "/profile",
    authenticateUser,
    userController.updateUserProfile
);


// DELETE /api/auth/profile
// Delete logged-in user's account
router.delete(
    "/profile",
    authenticateUser,
    userController.deleteUserProfile
);


export { router as userRoutes };