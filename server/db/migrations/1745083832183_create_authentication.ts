import { sql, type Kysely } from "kysely";
import { addDbTimestamp } from "../../src/utils/add-db-timestamp";

export async function up(db: Kysely<any>): Promise<void> {
  let builder = db.schema
    .createTable("tblAuthentications")
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

  await sql`
    CREATE TRIGGER IF NOT EXISTS trgAuthenticationsUpdatedAt AFTER UPDATE ON tblAuthentications 
    BEGIN 
      UPDATE tblAuthentications SET updatedAt=(STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')) WHERE id=OLD.id;
    END;
  `.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await sql`DROP TRIGGER IF EXISTS trgAuthenticationsUpdatedAt;`.execute(db);
  await db.schema.dropTable("tblAuthentications").ifExists().execute();
}
