import type { Response } from "express";

export const ErrorResponse = (res: Response, msg?: string, error?: string) => {
  res.status(500).json({
    message: msg ?? "Something went wrong",
    error: error ?? "ServerError"
  });
};

export const BadRequestResponse = (
  res: Response,
  msg?: string,
  error?: string
) => {
  res.status(400).json({
    message: msg ?? "Bad Request",
    error: error ?? "BadRequest"
  });
};

export const ValidationResponse = (
  res: Response,
  msg?: string,
  error?: string
) => {
  res.status(400).json({
    message: msg ?? "Bad Request",
    error: error ?? "ValidationError"
  });
};

export const NotFoundResponse = (
  res: Response,
  msg?: string,
  error?: string
) => {
  res.status(404).json({
    message: msg ?? "Resource not found",
    error: error ?? "NotFound"
  });
};

export const UnauthorizedResponse = (
  res: Response,
  msg?: string,
  error?: string
) => {
  res.status(401).json({
    message: msg ?? "Unauthorized",
    error: error ?? "Unauthorized"
  });
};

export const ForbiddenResponse = (
  res: Response,
  msg?: string,
  error?: string
) => {
  res.status(403).json({
    message: msg ?? "Access denied",
    error: error ?? "Forbidden"
  });
};

export const SuccessResponse = <T>(
  res: Response,
  data?: T,
  statusCode?: number,
  msg?: string
) => {
  statusCode ??= 200;
  statusCode = statusCode < 300 && statusCode > 199 ? statusCode : 200;
  res.status(statusCode).json({
    message: msg ?? "Success",
    data
  });
};
