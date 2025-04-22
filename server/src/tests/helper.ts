import { DB } from "../config/db.config";
import { signAuthToken } from "../utils/auth-token";

function getAuthFromUser(user: { id: string; nonce: string }) {
  const [err, token] = signAuthToken(user);

  if (err) {
    throw "Can't setup token";
  }

  return token;
}

// get auth token
async function getUserAuthWithBusiness() {
  const user = await DB.selectFrom("tblUsers as u")
    .innerJoin("tblAuthentications as a", "a.userId", "u.id")
    .select(["u.id", "a.nonce"])
    .where("u.businessName", "is not", null)
    .limit(1)
    .executeTakeFirst();
  // const user = db
  //   .prepare<[], { id: string; nonce: string }>(
  //     `SELECT u.id, a.nonce
  //       FROM tblUsers AS u
  //       JOIN tblAuthentications AS a ON a.userId = u.id WHERE businessName IS NOT NULL LIMIT 1`
  //   )
  //   .get();

  if (!user) {
    throw "Can't setup user";
  }

  const token = getAuthFromUser(user);

  return {
    token,
    user
  };
}

async function getUserAuth() {
  const user = await DB.selectFrom("tblUsers as u")
    .innerJoin("tblAuthentications as a", "a.userId", "u.id")
    .select(["u.id", "a.nonce"])
    .where("u.businessName", "is", null)
    .limit(1)
    .executeTakeFirst();

  // const user = db
  //   .prepare<[], { id: string; nonce: string }>(
  //     `SELECT u.id, a.nonce
  //       FROM tblUsers AS u
  //       JOIN tblAuthentications AS a ON a.userId = u.id WHERE businessName IS NULL LIMIT 1`
  //   )
  //   .get();

  if (!user) {
    throw "Can't setup user";
  }

  const token = getAuthFromUser(user);

  return {
    token,
    user
  };
}

async function getAdminAuth() {
  const user = await DB.selectFrom("tblUsers as u")
    .innerJoin("tblAuthentications as a", "a.userId", "u.id")
    .select(["u.id", "a.nonce"])
    .where("u.role", "=", "ADMIN")
    .limit(1)
    .executeTakeFirst();

  // const user = db
  //   .prepare<[], { id: string; nonce: string }>(
  //     `SELECT u.id, a.nonce
  //       FROM tblUsers AS u
  //       JOIN tblAuthentications AS a ON a.userId = u.id WHERE role='ADMIN' LIMIT 1`
  //   )
  //   .get();

  if (!user) {
    throw "Can't setup user";
  }

  const token = getAuthFromUser(user);

  return {
    token,
    user
  };
}

async function getNonApprovedListings() {
  // const sql = `SELECT * FROM tblListings WHERE status != 'APPROVED'`;
  // const listings = db.prepare<[], { id: string }>(sql).all();

  const listings = await DB.selectFrom("tblListings")
    .selectAll()
    .where("status", "!=", "APPROVED")
    .execute();

  return listings;
}

async function getApprovedListings() {
  // const sql = `SELECT * FROM tblListings WHERE status = 'APPROVED'`;
  // const listings = db.prepare<[], { id: string }>(sql).all();

  const listings = await DB.selectFrom("tblListings")
    .selectAll()
    .where("status", "=", "APPROVED")
    .execute();

  return listings;
}

async function getApprovedListingsByUserId(userId: string) {
  // const sql = `SELECT * FROM tblListings WHERE status = 'APPROVED' AND userId=@userId`;
  // const listings = db
  //   .prepare<[{ userId: string }], { id: string }>(sql)
  //   .all({ userId });

  const listings = await DB.selectFrom("tblListings")
    .selectAll()
    .where("status", "=", "APPROVED")
    .where("userId", "=", userId)
    .execute();

  return listings;
}

export const helper = {
  getAdminAuth,
  getApprovedListings,
  getApprovedListingsByUserId,
  getNonApprovedListings,
  getUserAuth,
  getUserAuthWithBusiness
};
