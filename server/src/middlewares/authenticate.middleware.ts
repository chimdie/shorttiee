import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UnauthorizedResponse } from "../utils/response";
import { verifyAuthToken } from "../utils/auth-token";
import { findUserByIdWithAuth } from "../db/users.db";
import { DB } from "../config/db.config";
import { ctlWrapper } from "../utils/ctl-wrapper";
import { User } from "../dto/types.dto";

export const authenticate = ctlWrapper(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
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

  const userWithAuth = await findUserByIdWithAuth({ id: payload.id, DB });

  if (!userWithAuth) {
    return UnauthorizedResponse(res);
  }

  if (userWithAuth.nonce !== payload.nonce) {
    return UnauthorizedResponse(res);
  }

  const user: User = {
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
    photo: userWithAuth.photo,
    createdAt: userWithAuth.createdAt,
    updatedAt: userWithAuth.updatedAt
  };

  req.user = user;
  next();
});
