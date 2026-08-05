import { User } from "../models/user.model.js";

// Create User
export const createUser = async (userData) => {
    return await User.create(userData);
};

// Find User By Email
export const findUserByEmail = async (email) => {
    return await User.findOne({ email }).select("+password");
};
// export const findUserByEmail = async (email) => {
//     console.log("Searching email:", email);

//     const user = await User.findOne({ email }).select("+password");

//     console.log("User found:", user);

//     return user;
// };

// Find User By Id
export const findUserById = async (userId) => {
    return await User.findById(userId);
};

// Update User
export const updateUser = async (userId, updatedData) => {
    return await User.findByIdAndUpdate(
        userId,
        updatedData,
        {
            returnDocument: "after",
            runValidators: true,
        }
    );
};

// Delete User
export const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};