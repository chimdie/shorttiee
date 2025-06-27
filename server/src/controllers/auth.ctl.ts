import { Request } from "express";
import bcrypt from "bcrypt";
import { ctlWrapper } from "../utils/ctl-wrapper";
import {
  BadRequestResponse,
  ErrorResponse,
  ForbiddenResponse,
  SuccessResponse
} from "../utils/response";
import { findUserByEmail, findUserByIdWithAuth } from "../db/users.db";
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto
} from "../dto/auth.dto";
import {
  findAuthByUserId,
  updateAuthHashByUserId,
  updateAuthOtpAndHashByUserId,
  updateAuthOtpByUserId
} from "../db/auth.db";
import { signAuthToken } from "../utils/auth-token";
import assert from "assert";
import { appEnv } from "../config/env.config";
import { DB } from "../config/db.config";

export const registerCtl = ctlWrapper(
  async (req: Request<unknown, unknown, RegisterDto>, res) => {
    const emailDomain = req.body.email.split("@");
    const [dnsResolverError] = await req.app.locals.domainValidator(
      emailDomain[1]
    );
    if (dnsResolverError) {
      return BadRequestResponse(res, "Invalid email domain");
    }

    const result = await findUserByEmail(req.body.email);
    if (result) {
      return BadRequestResponse(res, "Account already exist");
    }

    const hash = await bcrypt.hash(req.body.password, 10);

    const [newUser, auth] = await DB.transaction().execute(async (trx) => {
      const userId = crypto.randomUUID();
      const user = await trx
        .insertInto("tblUsers")
        .values({
          id: userId,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          mobileNumber: req.body.mobileNumber,
          address: req.body.address,
          referrerCode: req.body.referrerCode,
          businessName: req.body.businessName,
          role: "USER",
          gender: req.body.gender
        })
        .returning([
          "id",
          "email",
          "role",
          "gender",
          "lastName",
          "address",
          "firstName",
          "mobileNumber",
          "businessName",
          "referrerCode"
        ])
        .executeTakeFirstOrThrow();

      const auth = await trx
        .insertInto("tblAuthentications")
        .values({
          id: crypto.randomUUID(),
          hash,
          userId: userId,
          nonce: req.app.locals.otp.hashOtp(hash)
        })
        .returning(["id", "hash", "otp", "userId", "nonce", "otpTTL"])
        .executeTakeFirstOrThrow();

      const userWithAuth = await findUserByIdWithAuth({ DB: trx, id: userId });
      if (!userWithAuth) {
        const err = new Error("An error occured while creating user");
        throw err;
      }

      return [user, auth] as const;
    });

    if (!newUser) {
      return ErrorResponse(res, "An error occured while creating user");
    }

    const [signAuthTokenErr, token] = signAuthToken({
      id: newUser.id,
      nonce: auth.nonce
    });
    if (signAuthTokenErr) {
      return ErrorResponse(res, "An error occured while siging token");
    }

    req.app.locals.event.emit("EVENT::EMAIL", {
      content: "You are welcome",
      title: "Welcome to our place",
      email: newUser.email,
      template: "REGISTER"
    });

    const mergeUserAndToken = Object.assign(newUser, { token });
    return SuccessResponse(res, mergeUserAndToken, 201, "Account created");
  }
);

export const loginCtl = ctlWrapper(
  async (req: Request<unknown, unknown, LoginDto>, res) => {
    const user = await findUserByEmail(req.body.email);

    if (!user) {
      return BadRequestResponse(res, "Invalid credentials");
    }

    const auth = await findAuthByUserId(user.id);

    if (!auth) {
      return BadRequestResponse(res, "Account does not exist");
    }

    const isValid = await bcrypt.compare(req.body.password, auth.hash);

    if (!isValid) {
      return BadRequestResponse(res, "Invalid credentials");
    }

    const [signAuthTokenErr, token] = signAuthToken({
      id: user.id,
      nonce: auth.nonce
    });
    if (signAuthTokenErr) {
      return ErrorResponse(res, "An error occured while siging token");
    }

    const data = Object.assign(user, { token });
    return SuccessResponse(res, data, 200, "Login successful");
  }
);

export const forgetPasswordCtl = ctlWrapper(
  async (req: Request<unknown, unknown, ForgotPasswordDto>, res) => {
    const user = await findUserByEmail(req.body.email);
    if (!user) {
      return BadRequestResponse(res, "Account does not exist");
    }

    const auth = await findAuthByUserId(user.id);
    if (!auth) {
      return BadRequestResponse(res, "Account does not exist");
    }

    const [otp, hash] = req.app.locals.otp.generateOtp();
    console.log({ otp });

    // send otp in email

    const ttl = new Date();
    ttl.setSeconds(ttl.getSeconds() + appEnv.OTP_TTL);

    // save otp
    await updateAuthOtpByUserId({
      userId: user.id,
      otp: hash,
      otpTTL: ttl.toISOString()
    });

    req.app.locals.event.emit("EVENT::EMAIL", {
      content: `Your OTP ${otp}`,
      title: "Why you forget your password?",
      email: user.email,
      template: "FORGOT_PASSWORD"
    });

    const msg = "An OTP has been sent to your email";
    return SuccessResponse(res, null, 200, msg);
  }
);

export const resetPasswordCtl = ctlWrapper(
  async (req: Request<unknown, unknown, ResetPasswordDto>, res) => {
    const user = await findUserByEmail(req.body.email);
    if (!user) {
      return BadRequestResponse(res, "Invalid credentials");
    }

    const auth = await findAuthByUserId(user.id);
    if (!auth) {
      return BadRequestResponse(res, "Account does not exist");
    }

    if (!auth.otp || !auth.otpTTL) {
      return ForbiddenResponse(res, "Invalid Operation");
    }

    const isValid = !req.app.locals.otp.verifyOtp(
      req.body.otp,
      auth.otp,
      new Date(auth.otpTTL)
    );
    if (!isValid) {
      return BadRequestResponse(res, "Invalid or expired OTP");
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    await updateAuthOtpAndHashByUserId({
      userId: user.id,
      hash,
      nonce: req.app.locals.otp.hashOtp(hash),
      otp: null,
      otpTTL: null
    });

    return SuccessResponse(res, null, 200, "Password reset was successful");
  }
);

export const changePasswordCtl = ctlWrapper(
  async (req: Request<unknown, unknown, ChangePasswordDto>, res) => {
    assert(typeof req.user !== "undefined", "User cannot be undefined");

    const auth = await findAuthByUserId(req.user.id);
    if (!auth) {
      return BadRequestResponse(res, "Account does not exist");
    }

    const isValid = await bcrypt.compare(req.body.oldPassword, auth.hash);
    if (!isValid) {
      return BadRequestResponse(res, "Invalid password credential");
    }

    const hash = await bcrypt.hash(req.body.newPassword, 10);
    const nonce = req.body.reauth
      ? req.app.locals.otp.hashOtp(hash)
      : auth.nonce;

    await updateAuthHashByUserId({
      userId: req.user.id,
      hash,
      nonce
    });

    return SuccessResponse(res, null, 200, "Password change was successful");
  }
);
