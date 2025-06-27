import { sql, type Kysely } from "kysely";
import { downTrigger, upTrigger } from "../../src/utils/db-triggers";
import { addDbTimestamp } from "../../src/utils/add-db-timestamp";

const tableName = "tblListings";
const triggerName = "trgListingsUpdatedAt";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  let builder = db.schema
    .createTable(tableName)
    .ifNotExists()
    .addColumn("id", "varchar", (col) => col.primaryKey().notNull())
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("address", "varchar", (col) => col.notNull())
    .addColumn("type", "varchar", (col) => {
      return col.notNull().check(sql`type IN ('SHORTLET','RENTAL','SALE')`);
    })
    .addColumn("status", "varchar", (col) => {
      return col
        .notNull()
        .check(sql`status IN ('AWAITING_REVIEW','REJECTED','APPROVED')`);
    })
    .addColumn("images", "varchar", (col) => col.notNull())
    .addColumn("description", "varchar")
    .addColumn("price", "integer")
    .addColumn("rate", "integer")
    .addColumn("restrictions", "varchar")
    .addColumn("userId", "varchar", (col) => col.notNull())
    .addColumn("categoryId", "varchar", (col) => col.notNull())
    .addForeignKeyConstraint("userId", ["userId"], "tblUsers", ["id"], (col) =>
      col.onDelete("cascade")
    )
    .addForeignKeyConstraint(
      "categoryId",
      ["categoryId"],
      "tblCategories",
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
