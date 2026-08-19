import jwt from "jsonwebtoken";

console.log("JWT_ACCESS_EXPIRES_IN:", process.env.JWT_ACCESS_EXPIRES_IN);
console.log("TYPE:", typeof process.env.JWT_ACCESS_EXPIRES_IN);
console.log("ACCESS SECRET LOADED:", !!process.env.JWT_ACCESS_SECRET);

export const generateAccessToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
        }
    );
};

export const generateRefreshToken = (userId) => {
    return jwt.sign(
        { userId},
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        }
    );
};

export const verifyAccessToken = (token) => {
    return jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET
    );
};

export const verifyRefreshToken = (token) => {
    return jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET
    );
};