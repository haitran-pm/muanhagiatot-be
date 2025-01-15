import { Response } from "express";

interface ResponseData {
  success?: boolean;
  data?: Record<string, unknown>[];
  errors?: Error;
  message?: string;
}

export const sendResponse = (
  res: Response,
  status: number,
  success?: boolean,
  data?: Record<string, unknown>[],
  errors?: Error,
  message?: string
): Response => {
  const response: ResponseData = {};
  if (success) response.success = success;
  if (data) response.data = data;
  if (errors) response.errors = errors;
  if (message) response.message = message;
  return res.status(status).json(response);
};

export class AppError extends Error {
  public statusCode: number;
  public errorType?: string;
  public isOperational: boolean;

  constructor(statusCode: number, message: string, errorType?: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorType = errorType;
    this.isOperational = true;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
