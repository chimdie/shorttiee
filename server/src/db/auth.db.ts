import { DB } from "../config/db.config";
import { UpdateAuth } from "../dto/types.dto";

export async function updateAuthHashByUserId(
  payload: Required<Pick<UpdateAuth, "hash" | "userId" | "nonce">>
) {
  return await DB.updateTable("tblAuthentications")
    .set(payload)
    .where("userId", "=", payload.userId)
    .execute();
  // return DB.prepare<Array<Pick<AuthTable, "hash" | "userId" | "nonce">>>(
  //   "UPDATE tblAuthentications SET hash=@hash, nonce=@nonce WHERE userId=@userId"
  // );
}

export async function updateAuthOtpByUserId(
  payload: Required<Pick<UpdateAuth, "otp" | "userId" | "otpTTL">>
) {
  return await DB.updateTable("tblAuthentications")
    .set(payload)
    .where("userId", "=", payload.userId)
    .execute();
  // return DB.prepare<Array<Pick<AuthTable, "otp" | "userId" | "otpTTL">>>(
  //   "UPDATE tblAuthentications SET otp=@otp, otpTTL=@otpTTL WHERE userId=@userId"
  // );
}

export async function updateAuthOtpAndHashByUserId(
  payload: Required<Omit<UpdateAuth, "id">>
) {
  return await DB.updateTable("tblAuthentications")
    .set(payload)
    .where("userId", "=", payload.userId)
    .execute();

  //   .prepare<Array<Omit<AuthTable, "id">>>(
  //   "UPDATE tblAuthentications SET otp=@otp, otpTTL=@otpTTL, hash=@hash, nonce=@nonce WHERE userId=@userId"
  // );
}

export async function findAuthByUserId(userId: string) {
  return await DB.selectFrom("tblAuthentications")
    .selectAll()
    .where("userId", "=", userId)
    .executeTakeFirstOrThrow();
}
