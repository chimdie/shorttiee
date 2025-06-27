import { sql, type Kysely } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("tblReservations")
    .addColumn("status", "varchar", (col) =>
      col
        .check(sql`status IN ('PENDING','ACCEPTED','REJECTED')`)
        .notNull()
        .defaultTo("DEFAULT")
    )
    .execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable("tblReservations").dropColumn("status").execute();
}
