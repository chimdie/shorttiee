import assert from "assert";
import {
  createListingQuery,
  findAllListingQuery,
  findListingByIdQuery,
  findListingFacilitiesQuery,
  updateListingStatusQuery as reviewListingStatusQuery
} from "../db/listing.db";
import {
  CreateListingsDto,
  ListingDto,
  ReviewListingDto
} from "../dto/listings.dto";
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
import { db } from "../config/db.config";
import { createFacilityAndListingQuery } from "../db/facility-and-listing.db";
import { fnToResult } from "../utils/fn-result";
import { findAllFacilitiesInArrayQuery } from "../db/facility.db";
import { findProductOwnerById } from "../db/users.db";

export const createListingCtl = ctlWrapper(
  async (req: Request<unknown, unknown, CreateListingsDto>, res) => {
    assert(req.user?.id);

    const category = findCategoryByIdQuery(req.body.categoryId);
    if (!category) {
      return BadRequestResponse(res, "Category does not exist");
    }

    const [facilitiesError, facilitiesResult] = findAllFacilitiesInArrayQuery(
      req.body.facilities
    );
    if (facilitiesError) {
      return ErrorResponse(res);
    }
    if (!facilitiesResult.length) {
      return BadRequestResponse(res, "Invalid facilities");
    }

    req.body.facilities = facilitiesResult.map((e) => e.id);

    const createListingPayload = Object.assign(req.body, {
      id: crypto.randomUUID(),
      userId: req.user.id,
      status: "AWAITING_REVIEW" as const,
      images: JSON.stringify(req.body.images)
    });

    const trx = fnToResult(
      db.transaction(() => {
        const [createListingError] = createListingQuery(createListingPayload);
        for (const item of createListingPayload.facilities) {
          const [createFacilityListingError] = createFacilityAndListingQuery({
            listingId: createListingPayload.id,
            facilityId: item
          });

          if (createFacilityListingError) {
            throw createFacilityListingError;
          }
        }
        if (createListingError) {
          throw createListingError;
        }
      })
    );

    const [createListingError] = trx();
    if (createListingError) {
      console.log("createListingError", createListingError);
      return ErrorResponse(res);
    }

    const [listingError, listingResult] = findListingByIdQuery(
      createListingPayload.id
    );
    if (listingError) {
      console.log("listingError", listingError);
      return ErrorResponse(res);
    }
    if (!listingResult) {
      return ErrorResponse(res, "An error occurred while creating listings");
    }

    return SuccessResponse(res, listingResult, 201);
  }
);

export const getAllListingCtl = ctlWrapper(
  async (_req: Request<unknown, unknown, CreateListingsDto>, res, next) => {
    const [listingError, listingResult] = findAllListingQuery(_req.query);

    if (listingError) {
      return next(listingError);
    }

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

    const [userError, user] = findProductOwnerById(listingResult.userId);
    if (userError) {
      return next(userError);
    }

    const listingWithUser = Object.assign({}, listingResult, { user });

    return SuccessResponse(res, listingWithUser);
  }
);

export const getListingFacilitiesCtl = ctlWrapper(
  async (req: Request<IdDto>, res, next) => {
    const [facilitiesError, facilities] = findListingFacilitiesQuery(
      req.params.id
    );

    if (facilitiesError) {
      next(facilitiesError);
    }

    SuccessResponse(res, facilities);
  }
);

export const reviewListingCtl = ctlWrapper(
  async (req: Request<IdDto, unknown, ReviewListingDto>, res, next) => {
    assert(req.user);

    let status: ListingDto["status"] = req.body.status
      ? "APPROVED"
      : "REJECTED";

    const [updateError, reservation] = reviewListingStatusQuery(
      req.params.id,
      req.user.id,
      status
    );

    if (updateError) {
      return next(updateError);
    }

    return SuccessResponse(res, reservation);
  }
);
