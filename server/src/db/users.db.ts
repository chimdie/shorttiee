import { db } from "../config/db.config";
import type { Auth } from "../dto/types.dto";
import { UserDto } from "../dto/user.dto";
import { WithDBTimestamps } from "../types/utils";
import { fnToResult } from "../utils/fn-result";

export function createUser() {
  return db.prepare<Array<UserDto>>(
    "INSERT INTO tblUsers(id, firstName, lastName, email, mobileNumber, businessName, referrerCode, address, gender) VALUES(@id, @firstName, @lastName, @email, @mobileNumber, @businessName, @referrerCode, @address, @gender)"
  );
}

export function findUserById(id: string) {
  const statement = db.prepare<string[], WithDBTimestamps<UserDto>>(
    "SELECT * FROM tblUsers WHERE id = ?"
  );

  const fn = fnToResult(statement.get.bind(statement));
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
