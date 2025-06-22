import { type Kysely } from "kysely";
import { downTrigger, upTrigger } from "../../src/utils/db-triggers";
import { addDbTimestamp } from "../../src/utils/add-db-timestamp";

const tableName = "tblReservations";
const triggerName = "trgReservationsUpdatedAt";
// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  let builder = db.schema
    .createTable(tableName)
    .addColumn("id", "varchar", (col) => col.primaryKey().notNull())
    .addColumn("code", "varchar", (col) => col.notNull())
    .addColumn("amount", "integer", (col) => col.notNull())
    .addColumn("startDate", "timestamptz", (col) => col.notNull())
    .addColumn("endDate", "timestamptz", (col) => col.notNull())
    .addColumn("userId", "varchar", (col) => col.notNull())
    .addColumn("listingId", "varchar", (col) => col.notNull())
    .addColumn("listingOwnerId", "varchar", (col) => col.notNull())
    .addForeignKeyConstraint("userId", ["userId"], "tblUsers", ["id"], (col) =>
      col.onDelete("cascade")
    )
    .addForeignKeyConstraint(
      "listingId",
      ["listingId"],
      "tblListings",
      ["id"],
      (col) => col.onDelete("cascade")
    )
    .addForeignKeyConstraint(
      "listingOwnerId",
      ["listingOwnerId"],
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
