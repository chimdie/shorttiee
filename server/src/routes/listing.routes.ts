import { Router } from "express";
import {
  createListingCtl,
  getAllListingCtl,
  getListingCtl,
  getListingFacilitiesCtl
} from "../controllers/listing.ctl";
import { validator } from "../middlewares/validator.middleware";
import { CreateListingsDto } from "../dto/listings.dto";
import {
  createListingsDocs,
  getAllListingsDocs,
  getListingFacilitiesDocs,
  getListingsDocs
} from "../docs/listing.docs";
import { IdDto } from "../dto/util.dto";
import { authenticate } from "../middlewares/authenticate.middleware";
import { authorize } from "../middlewares/authorize.middleware";
import { RequestQuery } from "../dto/query.dto";

export const listingsRouter = Router();

listingsRouter
  .route("/")
  .get(getAllListingsDocs, validator({ query: RequestQuery }), getAllListingCtl)
  .post(
    authenticate,
    authorize("create", "listing"),
    createListingsDocs,
    validator({ body: CreateListingsDto }),
    createListingCtl
  );

listingsRouter.get(
  "/:id/facilities",
  getListingFacilitiesDocs,
  validator({ params: IdDto }),
  getListingFacilitiesCtl
);

listingsRouter.get(
  "/:id",
  getListingsDocs,
  validator({ params: IdDto }),
  getListingCtl
);
