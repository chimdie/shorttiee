import bcrypt from "bcrypt";
import { db } from "../config/db.config";
import { appEnv } from "../config/env.config";
import type { Auth } from "../dto/types.dto";
import { UserDto } from "../dto/user.dto";
import { Merge, WithDBTimestamps, WithId } from "../types/utils";
import { fnToResult, fnToResultAsync } from "../utils/fn-result";
import { OTP } from "../utils/otp";
import { createAuth } from "./auth.db";
import debug from "debug";

export function createUser() {
  return db.prepare<Array<UserDto>>(
    "INSERT INTO tblUsers(id, firstName, lastName, email, mobileNumber, businessName, referrerCode, address, gender, role) VALUES(@id, @firstName, @lastName, @email, @mobileNumber, @businessName, @referrerCode, @address, @gender, @role)"
  );
}

export const createAdmin = fnToResultAsync(async () => {
  const userDto: Omit<UserDto, "id" | "role"> = {
    email: appEnv.ADMIN_EMAIL,
    photo: null,
    gender: null,
    lastName: "Admin",
    address: null,
    firstName: "Admin",
    mobileNumber: "00000000000",
    businessName: null,
    referrerCode: null
  };

  const hash = await bcrypt.hash(appEnv.ADMIN_PASS, 10);
  const nonce = OTP.hashOtp(hash);

  const trx = db.transaction(() => {
    const adminUser = findUserByEmail(appEnv.ADMIN_EMAIL);
    if (adminUser) {
      // return;
    }

    const userId = crypto.randomUUID();
    const [caUserError] = fnToResult(() => {
      db.prepare<Array<UserDto>>(
        "INSERT OR IGNORE INTO tblUsers(id, firstName, lastName, email, mobileNumber, businessName, referrerCode, address, gender, role) VALUES(@id, @firstName, @lastName, @email, @mobileNumber, @businessName, @referrerCode, @address, @gender, @role)"
      ).run({
        id: userId,
        firstName: userDto.firstName,
        lastName: userDto.lastName,
        email: userDto.email,
        mobileNumber: userDto.mobileNumber,
        address: userDto.address,
        referrerCode: userDto.referrerCode,
        businessName: userDto.businessName,
        role: "ADMIN",
        gender: userDto.gender
      });
    })();

    if (caUserError) {
      // assert("code" in caUserError);
      // debug("app:db:createAdmin")("ERROR:", caUserError.code);
      return;
    }

    const [caAuthError] = fnToResult(() => {
      createAuth().run({
        id: crypto.randomUUID(),
        hash,
        userId: userId,
        nonce
      });
    })();

    if (caAuthError) {
      // assert("code" in caAuthError);
      // debug("app:db:createAdmin")("ERROR:", caAuthError.code);
      return;
    }

    const userWithAuth = findUserByIdWithAuth(userId);
    if (!userWithAuth) {
      debug("app:db:createAdmin")("An error occured while creating user");
      const err = new Error("An error occured while creating user");
      throw err;
    }

    const user: UserDto = {
      id: userWithAuth.id,
      email: userWithAuth.email,
      role: userWithAuth.role,
      gender: userWithAuth.gender,
      lastName: userWithAuth.lastName,
      address: userWithAuth.address,
      firstName: userWithAuth.firstName,
      mobileNumber: userWithAuth.mobileNumber,
      businessName: userWithAuth.businessName,
      referrerCode: userWithAuth.referrerCode
    };

    const auth: Auth = {
      id: userWithAuth.authId,
      hash: userWithAuth.hash,
      otp: userWithAuth.otp,
      userId: userWithAuth.userId,
      nonce: userWithAuth.nonce,
      otpTTL: userWithAuth.otpTTL
    };

    return [user, auth] as const;
  });

  return trx();
});

export function findUserById(id: string) {
  const fn = fnToResult((id: string) => {
    return db
      .prepare<
        string[],
        WithDBTimestamps<UserDto>
      >("SELECT * FROM tblUsers WHERE id = ?")
      .get(id);
  });
  return fn(id);
}

export function findUserByEmail(email: string) {
  return db
    .prepare<
      string[],
      WithDBTimestamps<UserDto>
    >("SELECT * FROM tblUsers WHERE email = ?")
    .get(email);
}

export function findUserByIdWithAuth(id: string) {
  return db
    .prepare<
      string[],
      WithDBTimestamps<UserDto & Auth & { authId: string }>
    >("SELECT u.*, a.hash, a.id AS authId, a.nonce , a.otp, a.otpTTL FROM tblAuthentications AS a JOIN  tblUsers AS u ON a.userId=u.id WHERE u.id = ?")
    .get(id);
}

type UpdateUserPayload = Pick<
  UserDto,
  | "firstName"
  | "lastName"
  | "mobileNumber"
  | "businessName"
  | "address"
  | "photo"
  | "gender"
>;

export function updateUserById(id: string, payload: UpdateUserPayload) {
  const statement = db.prepare<
    Merge<UpdateUserPayload, { id: string }>[],
    WithDBTimestamps<WithId<UserDto>>
  >(
    "UPDATE tblUsers SET firstName=@firstName, lastName=@lastName, mobileNumber=@mobileNumber, businessName=@businessName, address=@address, gender=@gender, photo=@photo WHERE id=@id"
  );

  const fn = fnToResult(statement.run.bind(statement));
  return fn({ id, ...payload });
}

export function findProductOwnerById(id: string) {
  type User = WithDBTimestamps<
    Pick<
      UserDto,
      "firstName" | "lastName" | "email" | "mobileNumber" | "businessName"
    >
  >;

  const fn = fnToResult(() => {
    const sql =
      "SELECT firstName, lastName, email, mobileNumber, businessName, photo FROM tblUsers WHERE id = ?";
    return db.prepare<string[], User>(sql).get(id);
  });
  return fn();
}

export function findReservationOwnerById(id: string) {
  type User = WithDBTimestamps<
    Pick<UserDto, "firstName" | "lastName" | "email" | "mobileNumber">
  >;

  const fn = fnToResult(() => {
    const sql =
      "SELECT firstName, lastName, email, mobileNumber, photo FROM tblUsers WHERE id = ?";
    return db.prepare<string[], User>(sql).get(id);
  });
  return fn();
}
