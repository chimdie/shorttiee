import Database from "better-sqlite3";
import { appEnv } from "../utils/config-env";

const dbPath = appEnv.DATABASE_URL.replace("sqlite3:", "");
export const db = new Database(dbPath);
