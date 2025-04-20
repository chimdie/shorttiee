import { sql, type Kysely } from "kysely";
import { addDbTimestamp } from "../../src/utils/add-db-timestamp";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  // up migration code goes here...
  // note: up migrations are mandatory. you must implement this function.
  // For more info, see: https://kysely.dev/docs/migrations
  const schemaTable = db.schema
    .createTable("tblUsers")
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
    })
    .addColumn("createdAt", "datetime");

  addDbTimestamp(schemaTable);
  await schemaTable.execute();

  await sql`
		CREATE TRIGGER IF NOT EXISTS trgUsersUpdatedAt AFTER UPDATE ON tblUsers 
		BEGIN 
			UPDATE tblUsers SET updatedAt=(STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')) WHERE id=OLD.id;
		END;
	`.execute(db);
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  // down migration code goes here...
  // note: down migrations are optional. you can safely delete this function.
  // For more info, see: https://kysely.dev/docs/migrations
  await sql`DROP TRIGGER IF EXISTS trgUsersUpdatedAt;`.execute(db);
  await db.schema.dropTable("tblUsers").ifExists().execute();
}
