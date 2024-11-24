import { Router } from "express";
import { oapi } from "../config/docs.config";
import { createListingCtl } from "../controllers/listing.ctl";
import { validator } from "../middlewares/validator.middleware";
import { CreateListingsDto } from "../dto/listings.dto";

export const listingsRouter = Router();

listingsRouter
  .route("/")
  .post(oapi.path(), validator({ body: CreateListingsDto }), createListingCtl);
