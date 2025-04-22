import { DB } from "../config/db.config";
import { CreateFacility } from "../dto/types.dto";
import { fnToResultAsync } from "../utils/fn-result";

export const createFacilityQuery = async (payload: CreateFacility) => {
  // const statement = db.prepare<WithId<CreateFacilityDto>[]>(`
  // 	INSERT INTO tblFacilities (id, name, icon, comment, color)
  // 	VALUES (@id, @name, @icon, @comment, @color)
  // `);

  const fn = fnToResultAsync(async () => {
    return await DB.insertInto("tblFacilities").values(payload).execute();
  });
  return await fn();
};

export async function findAllFacilitiesQuery() {
  // const statement = db.prepare<[], FacilityDto>("SELECT * FROM tblFacilities");
  const fn = fnToResultAsync(async () => {
    return await DB.selectFrom("tblFacilities").selectAll().execute();
  });
  return await fn();
}

export async function findFacilityByIdQuery(id: string) {
  // const statement = db.prepare<{ id: string }[], FacilityDto>(
  //   "SELECT * FROM tblFacilities WHERE id=@id"
  // );
  const fn = fnToResultAsync(async () => {
    return await DB.selectFrom("tblFacilities")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();
  });
  return await fn();
}

export async function findFacilityByNameQuery(name: string) {
  // const statement = db.prepare<{ name: string }[], FacilityDto>(
  //   "SELECT * FROM tblFacilities WHERE name=@name"
  // );
  const fn = fnToResultAsync(async () => {
    return await DB.selectFrom("tblFacilities")
      .selectAll()
      .where("name", "=", name)
      .executeTakeFirst();
  });
  return await fn();
}

export async function findAllFacilitiesInArrayQuery(ids: string[]) {
  // const statement = db.prepare<string[][], FacilityDto>(
  //   `SELECT * FROM tblFacilities WHERE id IN (${ids.map((_) => "?").join()})`
  // );
  const fn = fnToResultAsync(async () => {
    return await DB.selectFrom("tblFacilities")
      .selectAll()
      .where("id", "in", ids)
      .execute();
  });
  return await fn();
}
