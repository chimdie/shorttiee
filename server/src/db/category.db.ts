import { db } from "../config/db.config";
import { CategoryDto, CreateCategoryDto } from "../dto/category.dto";
import { WithId } from "../types/utils";

export function createCategoryQuery() {
  return db.prepare<WithId<CreateCategoryDto>[]>(
    "INSERT INTO tblCategories (id, name, comment) VALUES(@id, @name, @comment)"
  );
}

export function findCategoryByIdQuery(id: string) {
  return db
    .prepare<
      WithId<{}>[],
      CategoryDto
    >("SELECT * FROM tblCategories WHERE id=@id")
    .get({ id });
}

export function findCategoryByNameQuery(name: string) {
  return db
    .prepare<
      Pick<CategoryDto, "name">[]
    >("SELECT * FROM tblCategories WHERE name=@name")
    .get({ name });
}

export function findAllCategoryQuery() {
  return db.prepare<[], CategoryDto>("SELECT * FROM tblCategories").all();
}
