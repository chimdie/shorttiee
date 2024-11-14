import { db } from "../config/db.config";
import { WithDBTimestamps } from "../types/utils";

export type Auth = {
  id: string;
  hash: string;
  userId: string;
  /**
   * a SHA1 hash of `hash`
   * useful for checking changes in the user auth
   *
   * @example invalidate all auth tokens after a password change by checking
   * the nonce in JWT
   */
  nonce: string;
  otp?: string | null;
  /** datetime */
  otpTTL?: string | null;
};

export function createAuth() {
  return db.prepare<Array<Auth>>(
    "INSERT INTO tblAuthentications(id, hash, userId, nonce) VALUES(@id, @hash, @userId, @nonce)"
  );
}

export function updateAuthHashByUserId() {
  return db.prepare<Array<Pick<Auth, "hash" | "userId" | "nonce">>>(
    "UPDATE tblAuthentications SET hash=@hash, nonce=@nonce WHERE userId=@userId"
  );
}

export function updateAuthOtpByUserId() {
  return db.prepare<Array<Pick<Auth, "otp" | "userId" | "otpTTL">>>(
    "UPDATE tblAuthentications SET otp=@otp, otpTTL=@otpTTL WHERE userId=@userId"
  );
}

export function updateAuthOtpAndHashByUserId() {
  return db.prepare<Array<Omit<Auth, "id">>>(
    "UPDATE tblAuthentications SET otp=@otp, otpTTL=@otpTTL, hash=@hash, nonce=@nonce WHERE userId=@userId"
  );
}

export function findAuthByUserId(userId: string) {
  return db
    .prepare<
      string[],
      WithDBTimestamps<Auth>
    >("SELECT * FROM tblAuthentications WHERE userId = ?")
    .get(userId);
}
