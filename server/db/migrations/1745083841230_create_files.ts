import { type Kysely } from "kysely";
import { downTrigger, upTrigger } from "../../src/utils/db-triggers";
import { addDbTimestamp } from "../../src/utils/add-db-timestamp";

const tableName = "tblFiles";
const triggerName = "trgFilesUpdatedAt";
// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  let builder = db.schema
    .createTable(tableName)
    .ifNotExists()
    .addColumn("path", "varchar", (col) => col.primaryKey().notNull())
    .addColumn("filename", "varchar", (col) => col.unique().notNull())
    .addColumn("checksum", "varchar", (col) => col.unique().notNull())
    .addColumn("contentType", "varchar", (col) => col.notNull())
    .addColumn("size", "varchar", (col) => col.notNull())
    .addColumn("ownerId", "varchar", (col) => col.notNull())
    .addForeignKeyConstraint(
      "ownerId",
      ["ownerId"],
      "tblUsers",
      ["id"],
      (col) => col.onDelete("cascade")
    );

  builder = addDbTimestamp(builder);
  await builder.execute();
  await upTrigger(db, tableName, triggerName);
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await downTrigger(db, tableName, triggerName);
  await db.schema.dropTable(tableName).ifExists().execute();
}
