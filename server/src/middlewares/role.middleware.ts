import { NextFunction, Request, Response } from "express";
import { ForbiddenResponse } from "../utils/response";
import asserts from "assert";

export function role_validator(role: Array<string>) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!("user" in req)) {
      return ForbiddenResponse(res, "Access restricted");
    }

    asserts(typeof req.user === "object");
    const user = req.user as object;

    if (!("role" in user)) {
      return ForbiddenResponse(res, "Access restricted");
    }

    if (req.user && role.includes(user.role as string)) {
      return next();
    }

    ForbiddenResponse(res, "Access restricted");
  };
}
