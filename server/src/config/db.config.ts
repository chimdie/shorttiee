import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import type { Database as AppDatabase } from "../db/database.db";
import { appEnv } from "./env.config";
import { SerializePlugin } from "kysely-plugin-serialize";

// export const db = new Database(dbPath);
// export default db;

/** ensure this array is always sorted */
// const dbTables = [
//   "tblAuthentications",
//   "tblCategories",
//   "tblFacilities",
//   "tblFiles",
//   "tblListings",
//   "tblListingsFacilities",
//   "tblUsers",
//   "tblReservations"
// ].sort();

// export function dbPrepare<
//   BindParameters extends unknown[] | {} = unknown[],
//   Result = unknown
// >(query: string) {
//   const fn = fnToResult(
//     db.prepare.bind<typeof db.prepare<BindParameters, Result>>(db)
//   );
//   const [err, statement] = fn(query);
//
//   if (err) {
//     debug("app:db:query")(`An error occured in "${query}"`);
//     debug("app:db:query:error")(err);
//     return [err] as const;
//   }
//
//   return [err, statement] as const;
// }

export function isAllDBTableMigrated() {
  // const [err, statement] = dbPrepare<[], { name: string }>(
  //   "SELECT name from PRAGMA_table_list WHERE name like 'tbl%' ORDER by name ASC;"
  // );
  //
  // if (err) {
  //   return false;
  // }
  //
  // const fn = fnToResult(statement.all.bind(statement));
  // const [error, _tables] = fn();
  //
  // if (error) {
  //   console.error(error);
  //   debug("app:db:check")(error);
  //   return false;
  // }
  //
  // const tables = _tables.map((t) => t.name).sort();
  //
  // if (tables.length != dbTables.length) {
  //   return false;
  // }
  //
  // for (const index in tables) {
  //   if (dbTables[index] != tables[index]) {
  //     return false;
  //   }
  // }
  //
  // return true;
}

function getPostgresDbDialect() {
  const pgDialect = new PostgresDialect({
    pool: new Pool({
      database: appEnv.DB_NAME,
      host: appEnv.DB_HOST,
      user: appEnv.DB_USER,
      password: appEnv.DB_PASSWORD,
      port: appEnv.DB_PORT,
      max: 10
    })
  });

  return [null, pgDialect] as const;
}

const [dialectError, dialect] = getPostgresDbDialect();

if (dialectError) {
  throw dialectError;
}
export const DB = new Kysely<AppDatabase>({
  dialect,
  plugins: [new SerializePlugin()]
  // log: ["query", "error"]
});

// CreateTableBuilder.prototype.addIdColumn = function (
//   this: CreateTableBuilder<any, any>,
//   col?: string
// ) {
//   return this.addColumn(col || "id", "uuid", (col) =>
//     col.primaryKey().defaultTo(sql`gen_random_uuid()`)
//   );
// };
