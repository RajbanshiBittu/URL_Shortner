import jwt from "jsonwebtoken";

const ACCESS_TOKEN_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || "1d";

export const generateAccessToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRES_IN,
        }
    );
};

export const generateRefreshToken = (userId) => {
    return jwt.sign(
        { userId},
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: REFRESH_TOKEN_EXPIRES_IN,
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