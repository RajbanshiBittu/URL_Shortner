import * as userRepository from "../repositories/user.repository.js";
import { hashPassword, comparePassword } from "../utils/password.util.js";
import { generateAccessToken } from "../utils/jwt.util.js";

import { AppError } from "../errors/AppError.js";
import { ERROR_CODES } from "../errors/errorCodes.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

// Register User
export const registerUser = async (userData) => {
    const { name, email, password } = userData;

    const existingUser = await userRepository.findUserByEmail(email);
    
    if (existingUser) {
        throw new AppError(
            ERROR_CODES.USER_ALREADY_EXISTS,
            "User already exists.",
            HTTP_STATUS.CONFLICT
        );
    }

    const hashedPassword = await hashPassword(password);

    const user = await userRepository.createUser({
        name,
        email,
        password: hashedPassword,
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
    };
};

// Login User
export const loginUser = async ({ email, password }) => {

    const user = await userRepository.findUserByEmail(email);
    if (!user) {
        throw new AppError(
            ERROR_CODES.INVALID_CREDENTIALS,
            "Invalid email or password.",
            HTTP_STATUS.UNAUTHORIZED
        );
    }

    // console.log("Request password: ", password);
    // console.log("User: ", user);
    // console.log("Stroed passowrd: ", user.password);

    const isPasswordMatched = await comparePassword(
        password,
        user.password
    );

    if (!isPasswordMatched) {
        throw new AppError(
            ERROR_CODES.INVALID_CREDENTIALS,
            "Invalid email or password.",
            HTTP_STATUS.UNAUTHORIZED
        );
    }

    const accessToken = generateAccessToken({
        id: user._id,
        email: user.email,
    });

    return {
        accessToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    };
};

// Get User Profile
export const getUserProfile = async (userId) => {

    const user = await userRepository.findUserById(userId);
    if (!user) {
        throw new AppError(
            ERROR_CODES.USER_NOT_FOUND,
            "User not found.",
            HTTP_STATUS.NOT_FOUND
        );
    }
    return user;
};

// Update User Profile
export const updateUserProfile = async (userId, updatedData) => {

    const allowedFields = ["name", "profilePicture"];
    const filteredData = {};

    for (const field of allowedFields) {
        if (updatedData[field] !== undefined) {
            filteredData[field] = updatedData[field];
        }
    }

    // Check if client sent at least one valid field
    if (Object.keys(filteredData).length === 0) {
        throw new AppError(
            ERROR_CODES.INVALID_REQUEST,
            "No valid fields provided for update.",
            HTTP_STATUS.BAD_REQUEST
        );
    }

    const updatedUser = await userRepository.updateUser(
        userId,
        filteredData
    );

    if (!updatedUser) {
        throw new AppError(
            ERROR_CODES.USER_NOT_FOUND,
            "User not found.",
            HTTP_STATUS.NOT_FOUND
        );
    }

    return updatedUser;
};

// Delete User
export const deleteUserProfile = async (userId) => {

    const deletedUser = await userRepository.deleteUser(userId);
    if (!deletedUser) {
        throw new AppError(
            ERROR_CODES.USER_NOT_FOUND,
            "User not found.",
            HTTP_STATUS.NOT_FOUND
        );
    }
    return;
};