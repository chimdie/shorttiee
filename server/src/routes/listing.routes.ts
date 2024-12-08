import { Router } from "express";
import {
  createListingCtl,
  getAllListingCtl,
  getListingCtl
} from "../controllers/listing.ctl";
import { validator } from "../middlewares/validator.middleware";
import { CreateListingsDto } from "../dto/listings.dto";
import {
  createListingsDocs,
  getAllListingsDocs,
  getListingsDocs
} from "../docs/listings.docs";
import { IdDto } from "../dto/util.dto";
import { authenticate } from "../middlewares/auth.middleware";

export const listingsRouter = Router();

listingsRouter
  .route("/")
  .get(getAllListingsDocs, getAllListingCtl)
  .post(
    authenticate,
    createListingsDocs,
    validator({ body: CreateListingsDto }),
    createListingCtl
  );

listingsRouter.get(
  "/:id",
  getListingsDocs,
  validator({ params: IdDto }),
  getListingCtl
);
