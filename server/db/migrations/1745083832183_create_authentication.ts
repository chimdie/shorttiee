import { type Kysely } from "kysely";
import { downTrigger, upTrigger } from "../../src/utils/db-triggers";
import { addDbTimestamp } from "../../src/utils/add-db-timestamp";

const tableName = "tblAuthentications";
const triggerName = "trgAuthenticationsUpdatedAt";

export async function up(db: Kysely<any>): Promise<void> {
  let builder = db.schema
    .createTable(tableName)
    .ifNotExists()
    .addColumn("id", "varchar", (col) => col.primaryKey().notNull())
    .addColumn("hash", "varchar", (col) => col.notNull())
    .addColumn("otp", "varchar")
    .addColumn("otpTTL", "varchar")
    .addColumn("userId", "varchar", (col) =>
      col.unique().notNull().references("tblUsers.id").onDelete("cascade")
    )
    .addColumn("nonce", "varchar", (col) => col.notNull());

  builder = addDbTimestamp(builder);
  await builder.execute();
  await upTrigger(db, tableName, triggerName);
}

export async function down(db: Kysely<any>): Promise<void> {
  await downTrigger(db, tableName, triggerName);
  await db.schema.dropTable(tableName).ifExists().execute();
}
