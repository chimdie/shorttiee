import type { Kysely } from "kysely";
import { Database } from "../../src/db/database.db";
import { CreateReservation } from "../../src/dto/types.dto";
import { faker } from "@faker-js/faker";

// replace `any` with your database interface.
export async function seed(db: Kysely<Database>): Promise<void> {
  const usersProm = db
    .selectFrom("tblUsers")
    .select("id")
    .where("businessName", "is", null)
    .execute();

  const listingsProm = db
    .selectFrom("tblListings")
    .select(["id", "userId"])
    .where("status", "=", "APPROVED")
    .execute();

  const [users, listings] = await Promise.all([usersProm, listingsProm]);

  await db.transaction().execute(async (trx) => {
    const execs = Array.from({ length: 30 }).map((_) => {
      const listing = faker.helpers.arrayElement(listings);
      const reservation: CreateReservation = {
        id: faker.string.uuid(),
        code: faker.commerce.productName(),
        amount: parseInt(faker.commerce.price()),
        startDate: faker.date.soon().toISOString(),
        endDate: faker.date.soon().toISOString(),
        status: faker.helpers.arrayElement(["ACCEPTED", "PENDING", "REJECTED"]),
        userId: faker.helpers.arrayElement(users).id,
        listingId: listing.id,
        listingOwnerId: listing.userId
      };

      return trx.insertInto("tblReservations").values(reservation).execute();
    });

    await Promise.all(execs);
  });
}
