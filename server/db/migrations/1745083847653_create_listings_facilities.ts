import { type Kysely } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("tblListingsFacilities")
    .ifNotExists()
    .addColumn("facilityId", "varchar", (col) => col.notNull())
    .addColumn("listingId", "varchar", (col) => col.notNull())
    .execute();

  await db.schema
    .createIndex("listingsFacilitiesId")
    .ifNotExists()
    .on("tblListingsFacilities")
    .columns(["facilityId", "listingId"])
    .execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .dropIndex("tblListingsFacilities.listingsFacilitiesId")
    .ifExists()
    .execute();

  await db.schema.dropTable("tblListingsFacilities").ifExists().execute();
}
