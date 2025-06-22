import { type Kysely } from "kysely";
import { Database } from "../../src/db/database.db";
import { CreateListing, CreateListingFacility } from "../../src/dto/types.dto";
import { faker } from "@faker-js/faker";

// replace `any` with your database interface.
export async function seed(db: Kysely<Database>): Promise<void> {
  const userProm = db
    .selectFrom("tblUsers")
    .select("id")
    .where("businessName", "is not", null)
    .execute();
  const categoryProm = db.selectFrom("tblCategories").select("id").execute();
  const facilityProm = db.selectFrom("tblFacilities").select("id").execute();

  const [users, categories, facilities] = await Promise.all([
    userProm,
    categoryProm,
    facilityProm
  ]);

  await db.transaction().execute(async (trx) => {
    for (const _ in Array.from({ length: 30 })) {
      const listing: CreateListing = {
        id: crypto.randomUUID(),
        name: faker.commerce.productName(),
        address: faker.location.streetAddress(),
        type: faker.helpers.arrayElement(["RENTAL", "SALE", "SHORTLET"]),
        status: faker.helpers.arrayElement([
          "APPROVED",
          "REJECTED",
          "AWAITING_REVIEW"
        ]),
        description: faker.commerce.productDescription(),
        restrictions: null,
        rate: parseInt(faker.commerce.price()),
        price: parseInt(faker.commerce.price()),
        images: JSON.stringify(
          Array.from<string>({ length: 3 }).fill(faker.image.url())
        ),
        userId: faker.helpers.arrayElement(users.map((u) => u.id)),
        categoryId: faker.helpers.arrayElement(categories.map((c) => c.id))
      };

      const listingFacility = faker.helpers
        .arrayElements(facilities.map((f) => f.id))
        .map((facilityId) => {
          const val: CreateListingFacility = {
            facilityId,
            listingId: listing.id
          };
          return val;
        });

      await trx.insertInto("tblListings").values(listing).execute();
      await trx
        .insertInto("tblListingsFacilities")
        .values(listingFacility)
        .execute();
    }
  });
}
