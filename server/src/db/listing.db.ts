import { fnToResultAsync } from "../utils/fn-result";
import { queryToSql } from "../utils/request-query";
import { RequestQuery } from "../dto/query.dto";
import { DB } from "../config/db.config";
import { CreateListing, UpdateListing } from "../dto/types.dto";
import { Kysely, SelectExpression } from "kysely";
import { Database } from "./database.db";
import assert from "assert";

export async function createListingQuery(data: CreateListing) {
  const fn = fnToResultAsync(async () => {
    return await DB.insertInto("tblListings").values(data).execute();
  });

  //  const statment = db.prepare<
  //    Expand<InsertListings>[],
  //    ListingDto & { images: string }
  //  >(`
  //      INSERT INTO tblListings (
  // id, name, address, type, status, description, price, rate, restrictions, userId, categoryId, images
  //      ) VALUES (
  // @id, @name, @address, @type, @status, @description, @price, @rate, @restrictions, @userId, @categoryId, @images
  //      )
  //    `);

  return await fn();
}

export async function createListingWithTrxQuery(
  DB: Kysely<Database>,
  data: CreateListing
) {
  const payload: CreateListing = {
    name: data.name,
    address: data.address,
    type: data.type,
    status: data.status,
    images: data.images,
    userId: data.userId,
    categoryId: data.categoryId,
    id: data.id,
    description: data.description,
    restrictions: data.restrictions,
    price: data.price,
    rate: data.rate
  };
  const fn = fnToResultAsync(async () => {
    return await DB.insertInto("tblListings").values(payload).execute();
  });
  return await fn();
}

export async function findListingByIdQuery(id: string) {
  const fn = fnToResultAsync(async () => {
    return await DB.selectFrom("tblListings")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();
  });

  return await fn();
}

export async function findListingByIdFilter(
  id: string,
  fields: ReadonlyArray<SelectExpression<Database, "tblListings">>
) {
  const fn = fnToResultAsync(async () => {
    let stmt = DB.selectFrom("tblListings");

    if (!fields) {
      stmt = stmt.selectAll();
    }
    if (Array.isArray(fields) && fields[0] === "*") {
      stmt = stmt.selectAll();
    } else {
      assert(Array.isArray(fields), "Expected not array");
      stmt = stmt.select(fields);
    }
    return await stmt.where("id", "=", id).executeTakeFirst();
  });
  return await fn();
}

export async function findAllListingQuery(query: RequestQuery) {
  // function run() {
  //   const sql = `SELECT * FROM tblListings ${q}`;
  //
  //   const result = db.prepare<unknown[], ListingDBDto>(sql).all(replacement);
  //
  //   result.forEach((val) => {
  //     if (val) {
  //       val.images = JSON.parse(val.images);
  //     }
  //   });
  //
  //   return result as unknown as ListingDto[];
  // }

  // if (query.filter?.length) {
  //   query.filter.forEach((f) => {
  //     const [field, op, val] = f;
  //     stmt = stmt.where(field as any, op, val);
  //   });
  // }

  // if (query.or_filter?.length) {
  //   stmt.where((eb) => {
  //     assert(query.or_filter);
  //     return eb.or(
  //       query.or_filter?.map((f) => {
  //         const [field, op, val] = f;
  //         return eb(field as any, op, val);
  //       })
  //     );
  //   });
  // }

  const fn = fnToResultAsync(async () => {
    let stmt = DB.selectFrom("tblListings").selectAll();
    stmt = queryToSql(stmt, query.filter, query.or_filter);

    return await stmt.execute();
  });

  return await fn();
}

export async function findListingFacilitiesQuery(listingId: string) {
  // function run() {
  //   const sql = `
  //     SELECT f.*
  //     FROM tblListingsFacilities  as lf
  //     JOIN tblFacilities as f on f.id = lf.facilityId
  //     where lf.listingId = ?
  //   `;
  //
  //   return db.prepare<string[], FacilityDto>(sql).all(listingId);
  // }

  const fn = fnToResultAsync(async () => {
    const stmt = DB.selectFrom("tblListingsFacilities as lf")
      .innerJoin("tblFacilities as f", "f.id", "lf.facilityId")
      .where("lf.listingId", "=", listingId)
      .selectAll(["f"]);

    return await stmt.execute();
  });
  return await fn();
}

/**
 * @description should be used for admin operations only
 */
export async function updateListingStatusQuery(
  id: string,
  status: Required<UpdateListing["status"]>
) {
  // const sql = `
  //   UPDATE tblListings
  //   SET status=@status
  //   WHERE id=@id
  //   RETURNING *
  // `;
  // type Params = { id: string; userId: string; status: ListingDto["status"] };
  // return db.prepare<Params[], ListingDto>(sql).get({ id, status, userId });

  const fn = fnToResultAsync(async () => {
    const stmt = DB.updateTable("tblListings")
      .set({ status })
      .where("id", "=", id)
      .returningAll();

    return await stmt.executeTakeFirst();
  });

  return await fn();
}
