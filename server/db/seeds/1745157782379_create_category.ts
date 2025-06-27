import { faker } from "@faker-js/faker";
import type { Kysely } from "kysely";
import { CreateCategory } from "../../src/dto/types.dto";
import { Database } from "../../src/db/database.db";

// replace `any` with your database interface.
export async function seed(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    const categories = ["Beach house", "Villa", "Duplex"];
    //
    const input = categories.map((name) => {
      const category: CreateCategory = {
        id: faker.string.uuid(),
        name,
        comment: null
      };
      return category;
    });

    await trx.insertInto("tblCategories").values(input).execute();
  });
}
