import { db } from "../config/db.config";
import { CreateListingsDto, ListingDto } from "../dto/listings.dto";
import { Expand } from "../types/utils";
import { fnToResult } from "../utils/fn-result";

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
	const statment = db.prepare<
		Pick<ListingDto, "id">[],
		ListingDto & { images: string }
	>("SELECT * FROM tblListings WHERE id=@id");
	const fn = fnToResult(statment.get.bind(statment));

	return fn({ id });
}

export function findAllListingQuery() {
	const statment = db.prepare<[], ListingDto & { images: string }>(
		"SELECT * FROM tblListings"
	);
	const fn = fnToResult(statment.all.bind(statment));
	return fn();
}
