import { sql, type Kysely } from "kysely";
import { addDbTimestamp } from "../../src/utils/add-db-timestamp";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  let builder = db.schema
    .createTable("tblFacilities")
    .ifNotExists()
    .addColumn("id", "varchar", (col) => col.primaryKey().notNull())
    .addColumn("name", "varchar", (col) => col.unique().notNull())
    .addColumn("icon", "varchar", (col) => col.notNull())
    .addColumn("comment", "varchar")
    .addColumn("color", "varchar");

  builder = addDbTimestamp(builder);
  await builder.execute();

  await sql`
    CREATE TRIGGER IF NOT EXISTS trgFacilitiesUpdatedAt AFTER UPDATE ON tblFacilities
    BEGIN 
      UPDATE tblFacilities SET updatedAt=(STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')) WHERE id=OLD.id;
    END;
  `.execute(db);
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await sql`DROP TRIGGER IF EXISTS trgFacilitiesUpdatedAt;`.execute(db);
  await db.schema.dropTable("tblFacilities").ifExists().execute();
}
