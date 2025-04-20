import { sql, type Kysely } from "kysely";
import { addDbTimestamp } from "../../src/utils/add-db-timestamp";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  const builder = db.schema
    .createTable("tblReservations")
    .addColumn("id", "varchar", (col) => col.primaryKey().notNull())
    .addColumn("code", "varchar", (col) => col.notNull())
    .addColumn("amount", "integer", (col) => col.notNull())
    .addColumn("startDate", "datetime", (col) => col.notNull())
    .addColumn("endDate", "datetime", (col) => col.notNull())
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

  addDbTimestamp(builder);
  await builder.execute();

  await sql`
		CREATE TRIGGER IF NOT EXISTS trgReservationsUpdatedAt AFTER UPDATE ON tblReservations
		BEGIN 
			UPDATE tblReservations SET updatedAt=(STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')) WHERE id=OLD.id;
		END;
	`.execute(db);
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await sql`DROP TRIGGER IF EXISTS trgReservationsUpdatedAt;`.execute(db);
  await db.schema.dropTable("tblReservations").execute();
}
