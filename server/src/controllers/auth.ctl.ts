import { Request } from "express";
import bcrypt from "bcrypt";
import { ctlWrapper } from "../utils/ctl-wrapper";
import {
  BadRequestResponse,
  ErrorResponse,
  ForbiddenResponse,
  SuccessResponse
} from "../utils/response";
import { createUser, findUserByEmail } from "../db/users.db";
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto
} from "../dto/auth.dto";
import {
  createAuth,
  findAuthByUserId,
  updateAuthHashByUserId,
  updateAuthOtpAndHashByUserId,
  updateAuthOtpByUserId
} from "../db/auth.db";
import { signAuthToken } from "../utils/auth-token";
import { db } from "../db/config.db";
import { domainValidator } from "../utils/domain-validator";
import { OTP } from "../utils/otp";
import assert from "assert";
import { appEnv } from "../utils/config-env";

export const registerCtl = ctlWrapper(
  async (req: Request<unknown, unknown, RegisterDto>, res) => {
    const emailDomain = req.body.email.split("@");
    const [dnsResolverError] = await domainValidator(emailDomain[1]);
    if (dnsResolverError) {
      return BadRequestResponse(res, "Invalid email domain");
    }

    const result = findUserByEmail(req.body.email);
    if (result) {
      return BadRequestResponse(res, "Account already exist");
    }

    const hash = await bcrypt.hash(req.body.password, 10);

    const trx = db.transaction(() => {
      createUser().run({
        id: crypto.randomUUID(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
        address: req.body.address,
        referrerCode: req.body.referrerCode,
        businessName: req.body.businessName,
        gender: req.body.gender
      });

      const _user = findUserByEmail(req.body.email);
      if (!_user) {
        const err = new Error("An error occured while creating user");
        throw err;
      }

      createAuth().run({
        id: crypto.randomUUID(),
        hash,
        userId: _user.id
      });

      return _user;
    });

    const newUser = trx(); // run transaction

    if (!newUser) {
      return ErrorResponse(res, "An error occured while creating user");
    }

    const [signAuthTokenErr, token] = signAuthToken(newUser.id);
    if (signAuthTokenErr) {
      return ErrorResponse(res, "An error occured while siging token");
    }

    const mergeUserAndToken = Object.assign(newUser, { token });
    return SuccessResponse(res, mergeUserAndToken, 201, "Account created");
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

    const data = Object.assign(user, { token });
    return SuccessResponse(res, data, 201, "Login successful");
  }
);

export const forgetPasswordCtl = ctlWrapper(
  async (req: Request<unknown, unknown, ForgotPasswordDto>, res) => {
    const user = findUserByEmail(req.body.email);
    if (!user) {
      return BadRequestResponse(res, "Account does not exist");
    }

    const auth = findAuthByUserId(user.id);
    if (!auth) {
      return BadRequestResponse(res, "Account does not exist");
    }

    const [otp, hash] = OTP.generateOtp();
    console.log({ otp });

    // send otp in email

    const ttl = new Date();
    ttl.setSeconds(ttl.getSeconds() + appEnv.OTP_TTL);

    // save otp
    updateAuthOtpByUserId().run({
      userId: user.id,
      otp: hash,
      otpTTL: ttl.toISOString()
    });

    const msg = "An OTP has been sent to your email";
    return SuccessResponse(res, null, 201, msg);
  }
);

export const resetPasswordCtl = ctlWrapper(
  async (req: Request<unknown, unknown, ResetPasswordDto>, res) => {
    const user = findUserByEmail(req.body.email);
    if (!user) {
      return BadRequestResponse(res, "Invalid credentials");
    }

    const auth = findAuthByUserId(user.id);
    if (!auth) {
      return BadRequestResponse(res, "Account does not exist");
    }

    if (!auth.otp || !auth.otpTTL) {
      return ForbiddenResponse(res, "Invalid Operation");
    }

    const isValid = !OTP.verifyOtp(
      req.body.otp,
      auth.otp,
      new Date(auth.otpTTL)
    );
    if (!isValid) {
      return BadRequestResponse(res, "Invalid or expired OTP");
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    updateAuthOtpAndHashByUserId().run({
      userId: user.id,
      hash,
      otp: null,
      otpTTL: null
    });

    return SuccessResponse(res, null, 201, "Password reset was successful");
  }
);

export const changePasswordCtl = ctlWrapper(
  async (req: Request<unknown, unknown, ChangePasswordDto>, res) => {
    assert(typeof req.user !== "undefined", "User cannot be undefined");

    const auth = findAuthByUserId(req.user.id);
    if (!auth) {
      return BadRequestResponse(res, "Account does not exist");
    }

    if (await bcrypt.compare(auth.hash, req.body.oldPassword)) {
      return BadRequestResponse(res, "Invalid password credential");
    }

    const hash = await bcrypt.hash(req.body.newPassword, 10);
    updateAuthHashByUserId().run({ userId: req.user.id, hash });

    return SuccessResponse(res, null, 201, "Password change was successful");
  }
);
