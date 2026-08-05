import { AppError } from "../errors/AppError.js";
import { ERROR_CODES } from "../errors/errorCodes.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const validate = (schema) => {

    return (req, res, next) => {

        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });

        if (error) {

            const formattedErrors = error.details.map((detail) => ({
                field: detail.path.join("."),
                message: detail.message,
            }));

            return next(
                new AppError(
                    ERROR_CODES.VALIDATION_ERROR,
                    "Validation failed.",
                    HTTP_STATUS.BAD_REQUEST,
                    formattedErrors
                )
            );
        }

        req.body = value;

        next();
    };
};