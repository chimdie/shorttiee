import { db } from "../config/db.config";
import {
	CreateListingsDto,
	ListingDBDto,
	ListingDto
} from "../dto/listings.dto";
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
	function _findListingByIdQuery(id: string) {
		const sql = `
		SELECT 
			l.*,
			json_group_array(json_object('name',f.name,'icon',f.icon,'color',f.color,'comment',f.comment,'id',f.id)) as facilities
		FROM tblListingsFacilities AS lf
			JOIN tblListings AS l ON lf.listingId=l.id
			JOIN tblFacilities AS f ON lf.facilityId=f.id
		WHERE l.id=@id
		GROUP BY l.id
	`;
		const statment = db.prepare<Pick<ListingDto, "id">[], ListingDBDto>(sql);

		const val = statment.get({ id });

		if (val) {
			val.images = JSON.parse(val.images);
			val.facilities = JSON.parse(val.facilities);
		}

		return val as unknown as ListingDto;
	}

	const fn = fnToResult(_findListingByIdQuery);
	return fn(id);
}

export function findAllListingQuery() {
	function run() {
		const sql = `
		SELECT 
			l.*,
			json_group_array(json_object('name',f.name,'icon',f.icon,'color',f.color,'comment',f.comment,'id',f.id)) as facilities
		FROM tblListingsFacilities AS lf
			JOIN tblListings AS l ON lf.listingId=l.id
			JOIN tblFacilities AS f ON lf.facilityId=f.id
		GROUP BY l.id
	`;

		const result = db.prepare<[], ListingDBDto>(sql).all();

		result.forEach((val) => {
			if (val) {
				val.images = JSON.parse(val.images);
				val.facilities = JSON.parse(val.facilities);
			}
		});

		return result as unknown as ListingDto[];
	}

	const fn = fnToResult(run);
	return fn();
}
