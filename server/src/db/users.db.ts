import bcrypt from "bcrypt";
import { DB } from "../config/db.config";
import { appEnv } from "../config/env.config";
import type { CreateUser, UpdateUser } from "../dto/types.dto";
import { UserDto } from "../dto/user.dto";
import { fnToResultAsync } from "../utils/fn-result";
import { OTP } from "../utils/otp";
import debug from "debug";
import { Kysely } from "kysely";
import { Database } from "./database.db";
import { AppError } from "../utils/errors";

export async function createUser(payload: CreateUser) {
  // db.prepare<Array<UserDto>>(
  //   "INSERT INTO tblUsers(id, firstName, lastName, email, mobileNumber, businessName, referrerCode, address, gender, role) VALUES(@id, @firstName, @lastName, @email, @mobileNumber, @businessName, @referrerCode, @address, @gender, @role)"
  // );

  return await DB.insertInto("tblUsers").values(payload).execute();
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

  return await DB.transaction().execute(async (trx) => {
    //
    const adminUser = await trx
      .selectFrom("tblUsers")
      .selectAll()
      .where("email", "=", appEnv.ADMIN_EMAIL)
      .executeTakeFirst();

    if (adminUser) {
      return;
    }

    const userId = crypto.randomUUID();
    const newAdminUser = await trx
      .insertInto("tblUsers")
      .values({
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
      })
      .returningAll()
      .executeTakeFirst();

    const auth = await trx
      .insertInto("tblAuthentications")
      .values({
        id: crypto.randomUUID(),
        hash,
        userId: userId,
        nonce
      })
      .returningAll()
      .executeTakeFirst();

    if (!newAdminUser || !auth) {
      throw new AppError("Error creating admin");
    }

    const userWithAuth = await findUserByIdWithAuth({ id: userId, DB: trx });
    if (!userWithAuth) {
      debug("app:db:createAdmin")("An error occured while creating user");
      const err = new Error("An error occured while creating user");
      throw err;
    }

    return [newAdminUser, auth] as const;
  });

  // const trx = db.transaction(() => {
  //   const [caUserError] = fnToResult(() => {
  //     db.prepare<Array<UserDto>>(
  //       "INSERT OR IGNORE INTO tblUsers(id, firstName, lastName, email, mobileNumber, businessName, referrerCode, address, gender, role) VALUES(@id, @firstName, @lastName, @email, @mobileNumber, @businessName, @referrerCode, @address, @gender, @role)"
  //     ).run();
  //   })();
  //
  //   if (caUserError) {
  //     // assert("code" in caUserError);
  //     // debug("app:db:createAdmin")("ERROR:", caUserError.code);
  //     return;
  //   }
  //
  //   const [caAuthError] = fnToResult(() => {
  //     createAuth().run();
  //   })();
  //
  //   if (caAuthError) {
  //     // assert("code" in caAuthError);
  //     // debug("app:db:createAdmin")("ERROR:", caAuthError.code);
  //     return;
  //   }
  // });

  // return trx();
});

export async function findUserById(id: string) {
  const fn = fnToResultAsync(async () => {
    // return db
    //   .prepare<
    //     string[],
    //     WithDBTimestamps<UserDto>
    //   >("SELECT * FROM tblUsers WHERE id = ?")
    //   .get(id);
    return await DB.selectFrom("tblUsers")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();
  });
  return await fn();
}

export async function findUserByEmail(email: string) {
  return await DB.selectFrom("tblUsers")
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst();
  // return db
  //   .prepare<
  //     string[],
  //     WithDBTimestamps<UserDto>
  //   >("SELECT * FROM tblUsers WHERE email = ?")
  //   .get(email);
}

export async function findUserByIdWithAuth(option: {
  DB?: Kysely<Database>;
  id: string;
}) {
  const db = option.DB || DB;
  return await db
    .selectFrom("tblUsers as u")
    .innerJoin("tblAuthentications as a", "u.id", "a.userId")
    .selectAll("u")
    .select(["a.hash", "a.id as authId", "a.nonce", "a.otp", "a.otpTTL"])
    .where("u.id", "=", option.id)
    .executeTakeFirst();

  // return db
  //   .prepare<
  //     string[],
  //     WithDBTimestamps<UserDto & AuthTable & { authId: string }>
  //   >("SELECT u.*, a.hash, a.id AS authId, a.nonce , a.otp, a.otpTTL FROM tblAuthentications AS a JOIN  tblUsers AS u ON a.userId=u.id WHERE u.id = ?")
  //   .get(id);
}

export async function updateUserById(id: string, payload: UpdateUser) {
  // const statement = db.prepare<
  //   Merge<UpdateUserPayload, { id: string }>[],
  //   WithDBTimestamps<WithId<UserDto>>
  // >(
  //   "UPDATE tblUsers SET firstName=@firstName, lastName=@lastName, mobileNumber=@mobileNumber, businessName=@businessName, address=@address, gender=@gender, photo=@photo WHERE id=@id"
  // );

  const fn = fnToResultAsync(async () => {
    const stmt = DB.updateTable("tblUsers").set(payload).where("id", "=", id);
    return await stmt.execute();
  });
  return await fn();
}

// export async function createAuth(payload: CreateAuth) {
//   // return DB.prepare<Array<AuthTable>>(
//   //   "INSERT INTO tblAuthentications(id, hash, userId, nonce) VALUES(@id, @hash, @userId, @nonce)"
//   // );
// }
