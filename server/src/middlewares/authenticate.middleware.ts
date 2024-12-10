import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UnauthorizedResponse } from "../utils/response";
import { verifyAuthToken } from "../utils/auth-token";
import { findUserByIdWithAuth } from "../db/users.db";
import { WithDBTimestamps } from "../types/utils";
import { UserDto } from "../dto/user.dto";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.get("Authorization") || "";
  const token = header.replace("Bearer ", "");

  if (!token) {
    return UnauthorizedResponse(res);
  }

  const [verifyError, _decoded] = verifyAuthToken(token);

  if (verifyError) {
    return UnauthorizedResponse(res);
  }

  const decoded = _decoded as jwt.JwtPayload;
  const payload = decoded.payload;

  if (!("nonce" in payload && "id" in payload)) {
    return UnauthorizedResponse(res);
  }

  const userWithAuth = findUserByIdWithAuth(payload.id);

  if (!userWithAuth) {
    return UnauthorizedResponse(res);
  }

  if (userWithAuth.nonce !== payload.nonce) {
    return UnauthorizedResponse(res);
  }

  const user: WithDBTimestamps<UserDto> = {
    id: userWithAuth.id,
    email: userWithAuth.email,
    role: userWithAuth.role,
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
