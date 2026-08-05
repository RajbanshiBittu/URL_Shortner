// Custom Application Error:
// Base class for all operational errors.


export class AppError extends Error {
    constructor(
        errorCode,
        message,
        statusCode,
        details = null
    ) {
        super(message);
        this.name = this.constructor.name;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.details = details;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}