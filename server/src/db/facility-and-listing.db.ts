import { db } from "../config/db.config";
import { fnToResult } from "../utils/fn-result";

export type FacilityListing = {
	facilityId: string;
	listingId: string;
};
export const createFacilityAndListingQuery = (payload: FacilityListing) => {
	const statement = db.prepare(
		"INSERT INTO tblListingsFacilities (facilityId, listingId) VALUES (@facilityId, @listingId)"
	);

	const fn = fnToResult(statement.run.bind(statement));
	return fn(payload);
};
