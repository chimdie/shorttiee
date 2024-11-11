import { WithDBTimestamps } from "../types/utils";
import { db } from "./config.db";

export type Auth = {
  id: string;
  hash: string;
  userId: string;
  otp?: string | null;
};

export function createAuth() {
  return db.prepare<Array<Auth>>(
    "INSERT INTO tblAuthentications(id, hash, userId) VALUES(@id, @hash, @userId)"
  );
}

export function updateAuthOtpByUserId() {
  return db.prepare<Array<Pick<Auth, "otp" | "userId">>>(
    "UPDATE tblAuthentications SET otp=@otp WHERE userId=@userId"
  );
}

export function updateAuthHashByUserId() {
  return db.prepare<Array<Pick<Auth, "hash" | "userId">>>(
    "UPDATE tblAuthentications SET hash=@hash WHERE userId=@userId"
  );
}

export function updateAuthOtpAndHashByUserId() {
  return db.prepare<Array<Pick<Auth, "otp" | "userId" | "hash">>>(
    "UPDATE tblAuthentications SET otp=@otp hash=@hash WHERE userId=@userId"
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
