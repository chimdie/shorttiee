import { Database } from "better-sqlite3";
import { WithDBTimestamps } from "../types/utils";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  businessName?: string;
  referrerCode?: string;
  address?: string;
};

export function createUser(db: Database) {
  return db.prepare<Array<User>>(
    "INSERT INTO tblUsers(id, firstName, lastName, email, mobileNumber, businessName, referrerCode, address) VALUES(@id, @firstName, @lastName, @email, @mobileNumber, @businessName, @referrerCode, @address)"
  );
}

export function findUserById(db: Database, id: string) {
  return db
    .prepare<
      string[],
      WithDBTimestamps<User>
    >("SELECT * FROM tblUsers WHERE id = ?")
    .get(id);
}

export function findUserByEmail(db: Database, email: string) {
  return db
    .prepare<
      string[],
      WithDBTimestamps<User>
    >("SELECT * FROM tblUsers WHERE email = ?")
    .get(email);
}
