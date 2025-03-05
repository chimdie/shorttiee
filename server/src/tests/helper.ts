import { db } from "../config/db.config";
import { signAuthToken } from "../utils/auth-token";

function getAuthFromUser(user: { id: string; nonce: string }) {
  const [err, token] = signAuthToken(user);

  if (err) {
    throw "Can't setup token";
  }

  return token;
}

// get auth token
function getUserAuthWithBusiness() {
  const user = db
    .prepare<[], { id: string; nonce: string }>(
      `SELECT u.id, a.nonce 
        FROM tblUsers AS u
        JOIN  tblAuthentications AS a ON a.userId = u.id WHERE businessName IS NOT NULL LIMIT 1`
    )
    .get();

  if (!user) {
    throw "Can't setup user";
  }

  const token = getAuthFromUser(user);

  return {
    token,
    user
  };
}

function getUserAuth() {
  const user = db
    .prepare<[], { id: string; nonce: string }>(
      `SELECT u.id, a.nonce 
        FROM tblUsers AS u
        JOIN  tblAuthentications AS a ON a.userId = u.id WHERE businessName IS NULL LIMIT 1`
    )
    .get();

  if (!user) {
    throw "Can't setup user";
  }

  const token = getAuthFromUser(user);

  return {
    token,
    user
  };
}

function getAdminAuth() {
  const user = db
    .prepare<[], { id: string; nonce: string }>(
      `SELECT u.id, a.nonce 
        FROM tblUsers AS u
        JOIN  tblAuthentications AS a ON a.userId = u.id WHERE role='ADMIN' LIMIT 1`
    )
    .get();

  if (!user) {
    throw "Can't setup user";
  }

  const token = getAuthFromUser(user);

  return {
    token,
    user
  };
}

function getNonApprovedListings() {
  const sql = `SELECT * FROM tblListings WHERE status != 'APPROVED'`;
  const listings = db.prepare<[], { id: string }>(sql).all();

  return listings;
}

function getApprovedListings() {
  const sql = `SELECT * FROM tblListings WHERE status = 'APPROVED'`;
  const listings = db.prepare<[], { id: string }>(sql).all();

  return listings;
}

export const helper = {
  getAdminAuth,
  getApprovedListings,
  getNonApprovedListings,
  getUserAuth,
  getUserAuthWithBusiness
};
