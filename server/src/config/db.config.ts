import Database from "better-sqlite3";
import { appEnv } from "./env.config";
import { fnToResult } from "../utils/fn-result";
import { debug } from "debug";

const dbPath = appEnv.DATABASE_URL.replace("sqlite3:", "");
export const db = new Database(dbPath);
export default db;

/** ensure this array is always sorted */
const dbTables = [
  "tblAuthentications",
  "tblCategories",
  "tblFacilities",
  "tblFiles",
  "tblListings",
  "tblListingsFacilities",
  "tblUsers"
] as const;

export function dbPrepare<
  BindParameters extends unknown[] | {} = unknown[],
  Result = unknown
>(query: string) {
  const fn = fnToResult(
    db.prepare.bind<typeof db.prepare<BindParameters, Result>>(db)
  );
  const [err, statement] = fn(query);

  if (err) {
    debug("app:db:query")(`An error occured in "${query}"`);
    debug("app:db:query:error")(err);
    return [err] as const;
  }

  return [err, statement] as const;
}

export function isAllDBTableMigrated() {
  const [err, statement] = dbPrepare<[], { name: string }>(
    "SELECT name from PRAGMA_table_list WHERE name like 'tbl%' ORDER by name ASC;"
  );

  if (err) {
    return false;
  }

  const fn = fnToResult(statement.all.bind(statement));
  const [error, tables] = fn();

  if (error) {
    console.error(error);
    debug("app:db:check")(error);
    return false;
  }

  if (tables.length != dbTables.length) {
    return false;
  }

  for (const index in tables) {
    if (dbTables[index] != tables[index].name) {
      return false;
    }
  }

  return true;
}
