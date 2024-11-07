import { Request } from "express";
import bcrypt from "bcrypt";
import { ctlWrapper } from "../utils/ctl-wrapper";
import {
  BadRequestResponse,
  ErrorResponse,
  SuccessResponse
} from "../utils/response";
import {
  createUser,
  findUserByEmail,
  findUserById,
  User
} from "../db/users.db";
import { LoginDto, RegisterDto } from "../dto/auth.dto";
import { createAuth, findAuthByUserId } from "../db/auth.db";
import { WithDBTimestamps } from "../types/utils";
import { signAuthToken } from "../utils/auth-token";
import { db } from "../db/config.db";

export const registerCtl = ctlWrapper(
  async (req: Request<unknown, unknown, RegisterDto>, res) => {
    const result = findUserByEmail(req.body.email);
    console.log(result);

    if (result) {
      return BadRequestResponse(res, "Account already exist");
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    let newUser: WithDBTimestamps<User> | undefined;

    const trx = db.transaction(() => {
      const id = crypto.randomUUID();
      createUser().run({
        id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
        address: req.body.address,
        referrerCode: req.body.referrerCode,
        businessName: req.body.businessName
      });

      const _user = findUserById(id);
      if (!_user) {
        const err = new Error("An error occured while creating user");
        throw err;
      }

      createAuth().run({
        id: crypto.randomUUID(),
        hash,
        userId: _user.id
      });

      newUser = _user;
    });

    trx(); // run transaction

    if (!newUser) {
      return ErrorResponse(res, "An error occured while creating user");
    }

    const [signAuthTokenErr, token] = signAuthToken(newUser.id);
    if (signAuthTokenErr) {
      return ErrorResponse(res, "An error occured while siging token");
    }

    return SuccessResponse(
      res,
      Object.assign(newUser, { token }),
      201,
      "Account created"
    );
  }
);

export const loginCtl = ctlWrapper(
  async (req: Request<unknown, unknown, LoginDto>, res) => {
    const user = findUserByEmail(req.body.email);

    if (!user) {
      return BadRequestResponse(res, "Invalid credentials");
    }

    const auth = findAuthByUserId(user.id);

    if (!auth) {
      return BadRequestResponse(res, "Account does not exist");
    }

    const isValid = await bcrypt.compare(req.body.password, auth.hash);

    if (!isValid) {
      return BadRequestResponse(res, "Invalid credentials");
    }

    const [signAuthTokenErr, token] = signAuthToken(user.id);
    if (signAuthTokenErr) {
      return ErrorResponse(res, "An error occured while siging token");
    }

    return SuccessResponse(
      res,
      Object.assign(user, { token }),
      201,
      "Login successful"
    );
  }
);
