"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AppError = void 0;
class AppError extends Error {
    message;
    statusCode;
    constructor(message, statusCode = 400) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }
    console.error(err);
    return res.status(500).json({
        status: "error",
        message: "Internal server error",
    });
};
exports.errorHandler = errorHandler;
