import Database from "better-sqlite3";

const dbPath = process.env.DATABASE_URL.replace("sqlite3:", "");
export const db = new Database(dbPath);
