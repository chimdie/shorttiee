import { db } from "../config/db.config";
import type { User, Auth } from "../dto/types.dto";
import { WithDBTimestamps } from "../types/utils";

export function createUser() {
  return db.prepare<Array<User>>(
    "INSERT INTO tblUsers(id, firstName, lastName, email, mobileNumber, businessName, referrerCode, address, gender) VALUES(@id, @firstName, @lastName, @email, @mobileNumber, @businessName, @referrerCode, @address, @gender)"
  );
}

export function findUserById(id: string) {
  return db
    .prepare<
      string[],
      WithDBTimestamps<User>
    >("SELECT * FROM tblUsers WHERE id = ?")
    .get(id);
}

export function findUserByEmail(email: string) {
  return db
    .prepare<
      string[],
      WithDBTimestamps<User>
    >("SELECT * FROM tblUsers WHERE email = ?")
    .get(email);
}

export function findUserByIdWithAuth(id: string) {
  return db
    .prepare<
      string[],
      WithDBTimestamps<User & Auth & { authId: string }>
    >("SELECT u.*, a.hash, a.id AS authId, a.nonce , a.otp, a.otpTTL FROM tblAuthentications AS a JOIN  tblUsers AS u ON a.userId=u.id WHERE u.id = ?")
    .get(id);
}
