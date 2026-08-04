import * as userService from "../services/user.services.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { sendSuccessResponse } from "../utils/response.util.js";


// Register User
export const registerUser = asyncHandler(async (req, res) => {

    const user = await userService.registerUser(req.body);

    return sendSuccessResponse(res, {
        statusCode: HTTP_STATUS.CREATED,
        message: "User registered successfully.",
        data: user,
    });
});

// Login User
export const loginUser = asyncHandler(async (req, res) => {

    const loginResult = await userService.loginUser(req.body);

    return sendSuccessResponse(res, {
        statusCode: HTTP_STATUS.OK,
        message: "Login successful.",
        data: loginResult,
    });
});

// Get Profile
export const getUserProfile = asyncHandler(async (req, res) => {

    const user = await userService.getUserProfile(req.user.id);

    return sendSuccessResponse(res, {
        statusCode: HTTP_STATUS.OK,
        message: "Profile fetched successfully.",
        data: user,
    });
});

// Update Profile
export const updateUserProfile = asyncHandler(async (req, res) => {

    const updatedUser = await userService.updateUserProfile(
        req.user.id,
        req.body
    );

    return sendSuccessResponse(res, {
        statusCode: HTTP_STATUS.OK,
        message: "Profile updated successfully.",
        data: updatedUser,
    });
});


// Delete Profile
export const deleteUserProfile = asyncHandler(async (req, res) => {

    await userService.deleteUserProfile(req.user.id);

    return sendSuccessResponse(res, {
        statusCode: HTTP_STATUS.OK,
        message: "Account deleted successfully.",
    });
});