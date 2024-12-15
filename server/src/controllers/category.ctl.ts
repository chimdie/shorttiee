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
    const oldCategory = findCategoryByNameQuery(req.body.name);
    if (oldCategory) {
      return BadRequestResponse(res, "Duplicate Error");
    }

    const id = crypto.randomUUID();
    createCategoryQuery().run({
      id,
      name: req.body.name,
      comment: req.body.comment
    });

    const category = findCategoryByIdQuery(id);

    return SuccessResponse(res, category, 201);
  }
);

export const getAllCategoriesCtl = ctlWrapper(async (_, res) => {
  const category = findAllCategoryQuery();
  return SuccessResponse(res, category);
});
