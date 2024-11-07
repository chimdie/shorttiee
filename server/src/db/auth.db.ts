import { WithDBTimestamps } from "../types/utils";
import { db } from "./config.db";

export type Auth = {
  id: string;
  hash: string;
  userId: string;
};

export function createAuth() {
  return db.prepare<Array<Auth>>(
    "INSERT INTO tblAuthentications(id, hash, userId) VALUES(@id, @hash, @userId)"
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
