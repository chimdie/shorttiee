import { sql, type Kysely } from "kysely";
import { upTrigger, downTrigger } from "../../src/utils/db-triggers";
import { addDbTimestamp } from "../../src/utils/add-db-timestamp";

const triggerName = "trgUsersUpdatedAt";
const tableName = "tblUsers";

export async function up(db: Kysely<any>): Promise<void> {
  let builder = db.schema
    .createTable(tableName)
    .ifNotExists()
    .addColumn("id", "varchar", (col) => col.primaryKey().notNull())
    .addColumn("firstName", "varchar", (col) => col.notNull())
    .addColumn("lastName", "varchar", (col) => col.notNull())
    .addColumn("email", "varchar", (col) => col.notNull().unique())
    .addColumn("mobileNumber", "varchar", (col) => col.notNull())
    .addColumn("businessName", "varchar")
    .addColumn("referrerCode", "varchar")
    .addColumn("address", "varchar")
    .addColumn("gender", "varchar", (col) => {
      return col.check(sql`gender IN ('M','F')`);
    });

  builder = addDbTimestamp(builder);
  await builder.execute();
  // console.log(await sql`select * from "tblUsers"`.execute(db));
  // console.log(sql`select * from "tblUsers"`.compile(db));
  await upTrigger(db, tableName, triggerName);
}

export async function down(db: Kysely<any>): Promise<void> {
  await downTrigger(db, tableName, triggerName);
  await db.schema.dropTable(tableName).ifExists().execute();
}
