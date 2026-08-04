import { HTTP_STATUS } from "../constants/httpStatus.js";


export const errorHandler = (
    err,
    req,   
    res,
    next
) => {

    const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

    const response = {
        success: false,
        error: {
            code:
                err.errorCode ||
                "INTERNAL_SERVER_ERROR",
            message:
                err.message ||
                "Something went wrong.",
        },
    };

    if (err.details) response.error.details = err.details;
    if (process.env.NODE_ENV !== "production") response.stack = err.stack;

    console.error(err);

    return res
        .status(statusCode)
        .json(response);

};