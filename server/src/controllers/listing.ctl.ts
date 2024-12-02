import assert from "assert";
import {
  createListingQuery,
  findAllListingQuery,
  findListingByIdQuery
} from "../db/listing.db";
import { CreateListingsDto } from "../dto/listings.dto";
import { ctlWrapper } from "../utils/ctl-wrapper";
import {
  BadRequestResponse,
  ErrorResponse,
  NotFoundResponse,
  SuccessResponse
} from "../utils/response";
import { Request } from "express";
import { findCategoryByIdQuery } from "../db/category.db";
import { IdDto } from "../dto/util.dto";

export const createListingCtl = ctlWrapper(
  async (req: Request<unknown, unknown, CreateListingsDto>, res, next) => {
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
    const [createListingError, _] = createListingQuery(createListingPayload);

    if (createListingError) {
      return next(createListingError);
    }

    const [listingError, listingResult] = findListingByIdQuery(
      createListingPayload.id
    );
    if (listingError) {
      return next(listingError);
    }
    if (!listingResult) {
      return ErrorResponse(res, "An error occurred while creating listings");
    }

    listingResult.images = JSON.parse(listingResult.images);

    return SuccessResponse(res, listingResult, 201);
  }
);

export const getAllListingCtl = ctlWrapper(
  async (_req: Request<unknown, unknown, CreateListingsDto>, res, next) => {
    const [listingError, listingResult] = findAllListingQuery();
    if (listingError) {
      return next(listingError);
    }

    listingResult.forEach((e) => {
      e.images = JSON.parse(e.images);
    });

    return SuccessResponse(res, listingResult);
  }
);

export const getListingCtl = ctlWrapper(
  async (req: Request<IdDto, unknown, CreateListingsDto>, res, next) => {
    const [listingError, listingResult] = findListingByIdQuery(req.params.id);
    if (listingError) {
      return next(listingError);
    }

    if (!listingResult) {
      return NotFoundResponse(res);
    }

    listingResult.images = JSON.parse(listingResult.images);

    return SuccessResponse(res, listingResult);
  }
);
