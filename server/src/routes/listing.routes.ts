import { Router } from "express";
import { createListingCtl } from "../controllers/listing.ctl";
import { validator } from "../middlewares/validator.middleware";
import { CreateListingsDto } from "../dto/listings.dto";
import { createListingsDocs } from "../docs/listings.docs";

export const listingsRouter = Router();

listingsRouter
  .route("/")
  .post(
    createListingsDocs,
    validator({ body: CreateListingsDto }),
    createListingCtl
  );
