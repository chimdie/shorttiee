import Database from "better-sqlite3";
import { appEnv } from "./env.config";

const dbPath = appEnv.DATABASE_URL.replace("sqlite3:", "");
export const db = new Database(dbPath);
