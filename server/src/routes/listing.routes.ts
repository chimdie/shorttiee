import { Router } from "express";
import { createListingCtl, getAllListingCtl } from "../controllers/listing.ctl";
import { validator } from "../middlewares/validator.middleware";
import { CreateListingsDto } from "../dto/listings.dto";
import { createListingsDocs, getAllListingsDocs } from "../docs/listings.docs";

export const listingsRouter = Router();

listingsRouter
  .route("/")
  .get(getAllListingsDocs, getAllListingCtl)
  .post(
    createListingsDocs,
    validator({ body: CreateListingsDto }),
    createListingCtl
  );
