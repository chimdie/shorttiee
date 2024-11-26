import { db } from "../config/db.config";
import { CreateListingsDto, ListingDto } from "../dto/listings.dto";
import { Expand } from "../types/utils";

type InsertListings = CreateListingsDto &
  Pick<ListingDto, "status"> & { id: string; userId: string };

export function createListingQuery() {
  return db.prepare<Expand<InsertListings>[], ListingDto>(`
		INSERT INTO tblListings (
			id, name, address, type, status, description, price, rate, restrictions, userId, categoryId
		) VALUES (
			@id, @name, @address, @type, @status, @description, @price, @rate, @restrictions, @userId, @categoryId
		)
	`);
}

export function findListingByIdQuery(id: string) {
  return db
    .prepare<
      Pick<ListingDto, "id">[],
      ListingDto
    >("SELECT * FROM tblListings WHERE id=@id")
    .get({ id });
}
