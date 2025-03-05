import { db } from "../config/db.config";
import {
  CreateListingsDto,
  type ListingDBDto,
  ListingDto
} from "../dto/listings.dto";
import { Expand } from "../types/utils";
import { fnToResult } from "../utils/fn-result";
import { queryToSql } from "../utils/request-query";
import { RequestQuery } from "../dto/query.dto";
import { FacilityDto } from "../dto/facility.dto";

type InsertListings = CreateListingsDto &
  Pick<ListingDto, "status"> & { id: string; userId: string };

export function createListingQuery(data: InsertListings) {
  const statment = db.prepare<
    Expand<InsertListings>[],
    ListingDto & { images: string }
  >(`
      INSERT INTO tblListings (
	id, name, address, type, status, description, price, rate, restrictions, userId, categoryId, images
      ) VALUES (
	@id, @name, @address, @type, @status, @description, @price, @rate, @restrictions, @userId, @categoryId, @images
      )
    `);

  const fn = fnToResult(statment.run.bind(statment));
  return fn(data);
}

export function findListingByIdQuery(id: string) {
  function _findListingByIdQuery(id: string) {
    const sql = "SELECT * FROM tblListings WHERE id=@id";
    const statment = db.prepare<Pick<ListingDto, "id">[], ListingDBDto>(sql);

    const val = statment.get({ id });

    if (val) {
      val.images = JSON.parse(val.images);
    }

    return val as unknown as ListingDto;
  }

  const fn = fnToResult(_findListingByIdQuery);
  return fn(id);
}

export function findListingByIdFilter(
  id: string,
  fields: (keyof ListingDto)[] | ["*"] = ["*"]
) {
  function _findListingByIdQuery(id: string) {
    const sql = `SELECT ${fields.join()} FROM tblListings WHERE id=@id`;
    const statment = db.prepare<Pick<ListingDto, "id">[], ListingDBDto>(sql);

    const val = statment.get({ id });

    if (val) {
      val.images = JSON.parse(val.images);
    }

    return val as unknown as ListingDto;
  }

  const fn = fnToResult(_findListingByIdQuery);
  return fn(id);
}

export function findAllListingQuery(query: RequestQuery) {
  const [q, replacement] = queryToSql(
    query.filter,
    query.or_filter,
    query.shift
  );
  function run() {
    const sql = `SELECT * FROM tblListings ${q}`;

    const result = db.prepare<unknown[], ListingDBDto>(sql).all(replacement);

    result.forEach((val) => {
      if (val) {
        val.images = JSON.parse(val.images);
      }
    });

    return result as unknown as ListingDto[];
  }

  const fn = fnToResult(run);
  return fn();
}

export function findListingFacilitiesQuery(listingId: string) {
  function run() {
    const sql = `
      SELECT f.* 
      FROM tblListingsFacilities  as lf
      JOIN tblFacilities as f on f.id = lf.facilityId
      where lf.listingId = ?
    `;

    return db.prepare<string[], FacilityDto>(sql).all(listingId);
  }

  const fn = fnToResult(run);
  return fn();
}
