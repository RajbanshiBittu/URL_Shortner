import jwt from "jsonwebtoken";

import { HTTP_STATUS } from "../constants/httpStatus.js";
import { ERROR_CODES } from "../errors/errorCodes.js";
import { AppError } from "../errors/AppError.js";

export const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(
            new AppError(
                ERROR_CODES.UNAUTHORIZED,
                "Authorization header is missing.",
                HTTP_STATUS.UNAUTHORIZED
            )
        );
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
        return next(
            new AppError(
                ERROR_CODES.INVALID_TOKEN,
                "Invalid authorization format.",
                HTTP_STATUS.UNAUTHORIZED
            )
        );
    }
    
    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET
        );
        req.user = decoded;
        next();
    } catch (error) {
        //access token expired
        if (error instanceof jwt.TokenExpiredError){
            return next(
                new AppError(
                    ERROR_CODES.TOKEN_EXPIRED,
                    "Access token has expired.",
                    HTTP_STATUS.UNAUTHORIZED
                )
            );
        }
        
        //invalid token
        if (error instanceof jwt.JsonWebTokenError){
            return next(
                new AppError(
                    ERROR_CODES.INVALID_TOKEN,
                    "Invalid access token.",
                    HTTP_STATUS.UNAUTHORIZED
                )
            );
        }

        //Unexpected error
        return next(error);
    }
};