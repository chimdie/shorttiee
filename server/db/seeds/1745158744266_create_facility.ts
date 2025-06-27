import type { Kysely } from "kysely";
import { Database } from "../../src/db/database.db";
import { faker } from "@faker-js/faker";
import { CreateFacility } from "../../src/dto/types.dto";

// replace `any` with your database interface.
export async function seed(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    const facilities = ["Air Conditioning", "Swimming pool", "WiFi", "Laundry"];
    //
    const input = facilities.map((name) => {
      const facility: CreateFacility = {
        id: faker.string.uuid(),
        name,
        icon: faker.word.verb(),
        color: faker.color.human(),
        comment: faker.commerce.productDescription()
      };
      return facility;
    });

    await trx.insertInto("tblFacilities").values(input).execute();
  });
}
