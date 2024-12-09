import { Router } from "express";
import {
  createCategoryCtl,
  getAllCategoriesCtl
} from "../controllers/category.ctl";
import { validator } from "../middlewares/validator.middleware";
import { CreateCategoryDto } from "../dto/category.dto";
import { createCategoryDoc, getAllCategoryDoc } from "../docs/category.docs";
import { authenticate } from "../middlewares/authenticate.middleware";
import { authorize } from "../middlewares/authorize.middleware";

export const categoryRouter = Router();

categoryRouter
  .route("/")
  .post(
    authenticate,
    authorize("create", "category"),
    createCategoryDoc,
    validator({ body: CreateCategoryDto }),
    createCategoryCtl
  )
  .get(getAllCategoryDoc, getAllCategoriesCtl);
