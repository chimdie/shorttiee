import type { NextFunction, Request, Response } from "express";

type Middleware = (
  req: Request<any, any, any>,
  res: Response,
  next: NextFunction
) => Promise<unknown> | void;

export const ctlWrapper = (fn: Middleware): Middleware => {
  return async (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
};
