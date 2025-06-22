import { type Kysely } from "kysely";
import { downTrigger, upTrigger } from "../../src/utils/db-triggers";
import { addDbTimestamp } from "../../src/utils/add-db-timestamp";

const tableName = "tblFacilities";
const triggerName = "trgFacilitiesUpdatedAt";
// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  let builder = db.schema
    .createTable(tableName)
    .ifNotExists()
    .addColumn("id", "varchar", (col) => col.primaryKey().notNull())
    .addColumn("name", "varchar", (col) => col.unique().notNull())
    .addColumn("icon", "varchar", (col) => col.notNull())
    .addColumn("comment", "varchar")
    .addColumn("color", "varchar");

  builder = addDbTimestamp(builder);
  await builder.execute();

  await upTrigger(db, tableName, triggerName);
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await downTrigger(db, tableName, triggerName);
  await db.schema.dropTable(tableName).ifExists().execute();
}
