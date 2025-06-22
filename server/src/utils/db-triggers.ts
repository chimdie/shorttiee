import { Kysely, sql } from "kysely";

export async function upTrigger(
  db: Kysely<any>,
  tableName: string,
  triggerName: string
) {
  await sql
    .raw(
      ` CREATE OR REPLACE FUNCTION update_${tableName.toLowerCase()}_updated_at()
        RETURNS TRIGGER AS $$
        BEGIN
          UPDATE "${tableName}"
          SET updatedAt = NOW()
          WHERE id = OLD.id;
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `
    )
    .execute(db);

  return await sql
    .raw(
      ` CREATE TRIGGER "${triggerName}" 
        AFTER UPDATE ON "tblUsers"
        FOR EACH ROW
        EXECUTE FUNCTION update_${tableName.toLowerCase()}_updated_at();
      `
    )
    .execute(db);
}

export async function downTrigger(
  db: Kysely<any>,
  tableName: string,
  _triggerName?: string
) {
  // await sql
  //   .raw(`DROP TRIGGER IF EXISTS "${triggerName}" ON "${tableName}";`)
  //   .execute(db);

  return await sql
    .raw(
      `DROP FUNCTION IF EXISTS update_${tableName.toLowerCase()}_updated_at() CASCADE;`
    )
    .execute(db);
}
