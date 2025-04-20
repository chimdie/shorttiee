import { sql, type Kysely } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("tblUsers")
    .addColumn("role", "varchar", (col) => {
      return col
        .check(sql`role IN ('ADMIN','USER')`)
        .notNull()
        .defaultTo("USER");
    })
    .execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable("tblUsers").dropColumn("role").execute();
}
