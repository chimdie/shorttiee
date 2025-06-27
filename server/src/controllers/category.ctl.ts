import type { Request } from "express";
import { ctlWrapper } from "../utils/ctl-wrapper";
import { CreateCategoryDto } from "../dto/category.dto";
import { BadRequestResponse, SuccessResponse } from "../utils/response";
import {
  createCategoryQuery,
  findAllCategoryQuery,
  findCategoryByIdQuery,
  findCategoryByNameQuery
} from "../db/category.db";

export const createCategoryCtl = ctlWrapper(
  async (req: Request<unknown, unknown, CreateCategoryDto>, res) => {
    const oldCategory = await findCategoryByNameQuery(req.body.name);
    if (oldCategory) {
      return BadRequestResponse(res, "Duplicate Error");
    }

    const id = crypto.randomUUID();
    await createCategoryQuery({
      id,
      name: req.body.name,
      comment: req.body.comment
    });

    const category = await findCategoryByIdQuery(id);

    return SuccessResponse(res, category, 201);
  }
);

export const getAllCategoriesCtl = ctlWrapper(async (_, res) => {
  const category = await findAllCategoryQuery();
  return SuccessResponse(res, category);
});
