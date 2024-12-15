import { db } from "../config/db.config";
import { CreateFacilityDto, FacilityDto } from "../dto/facility.dto";
import { WithId } from "../types/utils";
import { fnToResult } from "../utils/fn-result";

export const createFacilityQuery = (payload: WithId<CreateFacilityDto>) => {
	const statement = db.prepare<WithId<CreateFacilityDto>[]>(`
		INSERT INTO tblFacilities (id, name, icon, comment, color)
		VALUES (@id, @name, @icon, @comment, @color)
	`);
	const fn = fnToResult(statement.run.bind(statement));

	return fn(payload);
};

export const findAllFacilitiesQuery = () => {
	const statement = db.prepare<[], FacilityDto>("SELECT * FROM tblFacilities");
	const fn = fnToResult(statement.all.bind(statement));

	return fn();
};

export const findFacilityByIdQuery = (id: string) => {
	const statement = db.prepare<{ id: string }[], FacilityDto>(
		"SELECT * FROM tblFacilities WHERE id=@id"
	);
	const fn = fnToResult(statement.get.bind(statement));

	return fn({ id });
};

export const findFacilityByNameQuery = (name: string) => {
	const statement = db.prepare<{ name: string }[], FacilityDto>(
		"SELECT * FROM tblFacilities WHERE name=@name"
	);
	const fn = fnToResult(statement.get.bind(statement));

	return fn({ name });
};

export function findAllFacilitiesInArrayQuery(ids: string[]) {
	const statement = db.prepare<string[][], FacilityDto>(
		`SELECT * FROM tblFacilities WHERE id IN (${ids.map((_) => "?").join()})`
	);
	const fn = fnToResult(statement.all.bind(statement));

	return fn(ids);
}
