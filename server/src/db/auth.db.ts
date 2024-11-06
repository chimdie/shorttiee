import type { Database } from "better-sqlite3";
import { WithDBTimestamps } from "../types/utils";

export type Auth = {
  id: string;
  hash: string;
  userId: string;
};

export function createAuth(db: Database) {
  return db.prepare<Array<Auth>>(
    "INSERT INTO tblAuthentications(id, hash, userId) VALUES(@id, @hash, @userId)"
  );
}

export function findAuthByUserId(db: Database, userId: string) {
  return db
    .prepare<
      string[],
      WithDBTimestamps<Auth>
    >("SELECT * FROM tblAuthentications WHERE userId = ?")
    .get(userId);
}
