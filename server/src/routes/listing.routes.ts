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
} from "../docs/listing.docs";
import { IdDto } from "../dto/util.dto";
import { authenticate } from "../middlewares/authenticate.middleware";
import { authorize } from "../middlewares/authorize.middleware";

export const listingsRouter = Router();

listingsRouter
  .route("/")
  .get(getAllListingsDocs, getAllListingCtl)
  .post(
    authenticate,
    authorize("create", "listing"),
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
