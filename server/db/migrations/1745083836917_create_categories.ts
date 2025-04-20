import { sql, type Kysely } from "kysely";
import { addDbTimestamp } from "../../src/utils/add-db-timestamp";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  let builder = db.schema
    .createTable("tblCategories")
    .ifNotExists()
    .addColumn("id", "varchar", (col) => col.notNull().primaryKey())
    .addColumn("name", "varchar", (col) => col.notNull().unique())
    .addColumn("comment", "varchar");

  builder = addDbTimestamp(builder);
  await builder.execute();

  await sql`
    CREATE TRIGGER IF NOT EXISTS trgCategoriesUpdatedAt AFTER UPDATE ON tblCategories 
    BEGIN 
      UPDATE tblCategories SET updatedAt=(STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')) WHERE id=OLD.id;
    END;
  `.execute(db);
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await sql`DROP TRIGGER IF EXISTS trgCategoriesUpdatedAt;`.execute(db);
  await db.schema.dropTable("tblCategories").ifExists().execute();
}
