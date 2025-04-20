import { sql, type Kysely } from "kysely";
import { addDbTimestamp } from "../../src/utils/add-db-timestamp";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  const builder = db.schema
    .createTable("tblFiles")
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

  addDbTimestamp(builder);
  await builder.execute();
  await sql`
		CREATE TRIGGER IF NOT EXISTS trgFilesUpdatedAt AFTER UPDATE ON tblFiles
		BEGIN 
			UPDATE tblFiles SET updatedAt=(STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')) WHERE path=OLD.path;
		END;
	`.execute(db);
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await sql`DROP TRIGGER IF EXISTS trgFilesUpdatedAt;`.execute(db);
  await db.schema.dropTable("tblFiles").ifExists().execute();
}
