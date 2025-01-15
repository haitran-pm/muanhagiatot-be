"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = exports.sendResponse = void 0;
const sendResponse = (res, status, success, data, errors, message) => {
    const response = {};
    if (success)
        response.success = success;
    if (data)
        response.data = data;
    if (errors)
        response.errors = errors;
    if (message)
        response.message = message;
    return res.status(status).json(response);
};
exports.sendResponse = sendResponse;
class AppError extends Error {
    statusCode;
    errorType;
    isOperational;
    constructor(statusCode, message, errorType) {
        super(message);
        this.statusCode = statusCode;
        this.errorType = errorType;
        this.isOperational = true;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
