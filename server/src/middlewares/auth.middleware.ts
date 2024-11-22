import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UnauthorizedResponse } from "../utils/response";
import { verifyAuthToken } from "../utils/auth-token";
import { findUserByIdWithAuth } from "../db/users.db";
import { User } from "../dto/types.dto";
import { WithDBTimestamps } from "../types/utils";

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
  const payload = decoded.payload;

  if (!("nonce" in payload && "id" in payload)) {
    return UnauthorizedResponse(res, "Unathorized");
  }

  const userWithAuth = findUserByIdWithAuth(payload.id);

  if (!userWithAuth) {
    return UnauthorizedResponse(res, "Unathorized");
  }

  if (userWithAuth.nonce !== payload.nonce) {
    return UnauthorizedResponse(res, "Unathorized");
  }

  const user: WithDBTimestamps<User> = {
    id: userWithAuth.id,
    email: userWithAuth.email,
    gender: userWithAuth.gender,
    lastName: userWithAuth.lastName,
    address: userWithAuth.address,
    firstName: userWithAuth.firstName,
    mobileNumber: userWithAuth.mobileNumber,
    businessName: userWithAuth.businessName,
    referrerCode: userWithAuth.referrerCode,
    createdAt: userWithAuth.createdAt,
    updatedAt: userWithAuth.updatedAt
  };

  req.user = user;
  next();
}
