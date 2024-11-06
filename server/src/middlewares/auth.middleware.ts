import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UnauthorizedResponse } from "../utils/response";
import { verifyAuthToken } from "../utils/auth-token";
import { findUserById } from "../db/users.db";
import { db } from "../db";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.get("Authorization") || "";
  const token = header.replace("Bearer ", "");

  if (!token) {
    return UnauthorizedResponse(res, "Unathorized");
  }

  const [verifyError, _decoded] = verifyAuthToken(token);

  if (verifyError) {
    return UnauthorizedResponse(res, "Unathorized");
  }

  const decoded = _decoded as jwt.JwtPayload;

  const user = findUserById(db, decoded.payload?.id);

  if (!user) {
    return UnauthorizedResponse(res, "Unathorized");
  }

  req.user = user;
  next();
}
