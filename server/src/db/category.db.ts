import { DB } from "../config/db.config";
import { CreateCategory } from "../dto/types.dto";

export async function createCategoryQuery(payload: CreateCategory) {
  return await DB.insertInto("tblCategories").values(payload).execute();
  // return db.prepare<WithId<CreateCategoryDto>[]>(
  //   "INSERT INTO tblCategories (id, name, comment) VALUES(@id, @name, @comment)"
  // );
}

export async function findCategoryByIdQuery(id: string) {
  return await DB.selectFrom("tblCategories")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();
  // return db
  //   .prepare<
  //     WithId<{}>[],
  //     CategoryDto
  //   >("SELECT * FROM tblCategories WHERE id=@id")
  //   .get({ id });
}

export async function findCategoryByNameQuery(name: string) {
  return await DB.selectFrom("tblCategories")
    .selectAll()
    .where("name", "=", name)
    .executeTakeFirst();
  // return db
  //   .prepare<
  //     Pick<CategoryDto, "name">[]
  //   >("SELECT * FROM tblCategories WHERE name=@name")
  //   .get({ name });
}

export async function findAllCategoryQuery() {
  return await DB.selectFrom("tblCategories").selectAll().execute();
  // return db.prepare<[], CategoryDto>("SELECT * FROM tblCategories").all();
}
