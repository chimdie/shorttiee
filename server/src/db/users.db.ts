import { db } from "../config/db.config";
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
  gender?: "M" | "F" | null;
};

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
