import { Kysely } from "kysely";
import { fnToResultAsync } from "../utils/fn-result";
import { Database } from "./database.db";
import { CreateListingFacility } from "../dto/types.dto";
import { DB } from "../config/db.config";

export async function createFacilityAndListingQuery(
  payload: CreateListingFacility
) {
  const fn = fnToResultAsync(async () => {
    return await DB.insertInto("tblListingsFacilities")
      .values(payload)
      .execute();
  });
  return await fn();
}

export async function createFacilityAndListingWithTrx(
  DB: Kysely<Database>,
  payload: CreateListingFacility
) {
  // const statement = db.prepare(
  //   "INSERT INTO tblListingsFacilities (facilityId, listingId) VALUES (@facilityId, @listingId)"
  // );

  const fn = fnToResultAsync(async () => {
    return await DB.insertInto("tblListingsFacilities")
      .values(payload)
      .execute();
  });

  return await fn();
}
