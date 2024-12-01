import assert from "assert";
import { createListingQuery, findListingByIdQuery } from "../db/listing.db";
import { CreateListingsDto } from "../dto/listings.dto";
import { ctlWrapper } from "../utils/ctl-wrapper";
import {
  BadRequestResponse,
  ErrorResponse,
  SuccessResponse
} from "../utils/response";
import { Request } from "express";
import { findCategoryByIdQuery } from "../db/category.db";

export const createListingCtl = ctlWrapper(
  async (req: Request<unknown, unknown, CreateListingsDto>, res) => {
    assert(req.user?.id);

    const category = findCategoryByIdQuery(req.body.categoryId);
    if (!category) {
      return BadRequestResponse(res, "Category does not exist");
    }

    const createListingPayload = Object.assign(req.body, {
      id: crypto.randomUUID(),
      userId: req.user.id,
      status: "AWAITING_REVIEW" as const,
      images: JSON.stringify(req.body.images)
    });
    createListingQuery().run(createListingPayload);

    const listing = findListingByIdQuery(createListingPayload.id);
    if (!listing) {
      ErrorResponse(res, "An error occurred while creating listings");
    }

    return SuccessResponse(res, listing, 201);
  }
);
