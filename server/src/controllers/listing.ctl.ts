import assert from "assert";
import {
  createListingWithTrxQuery,
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
import { createFacilityAndListingWithTrx } from "../db/facility-and-listing.db";
import { fnToResultAsync } from "../utils/fn-result";
import { findAllFacilitiesInArrayQuery } from "../db/facility.db";
import { findUserById } from "../db/users.db";
import { DB } from "../config/db.config";

export const createListingCtl = ctlWrapper(
  async (req: Request<unknown, unknown, CreateListingsDto>, res) => {
    assert(req.user?.id);

    const category = await findCategoryByIdQuery(req.body.categoryId);
    if (!category) {
      return BadRequestResponse(res, "Category does not exist");
    }

    const [facilitiesError, facilitiesResult] =
      await findAllFacilitiesInArrayQuery(req.body.facilities);
    if (facilitiesError) {
      return ErrorResponse(res);
    }
    if (!facilitiesResult.length) {
      return BadRequestResponse(res, "Invalid facilities");
    }

    const facilities = facilitiesResult.map((e) => e.id);

    const createListingData = Object.assign(req.body, {
      id: crypto.randomUUID(),
      userId: req.user.id,
      status: "AWAITING_REVIEW" as const,
      images: JSON.stringify(req.body.images)
    });

    const trx = fnToResultAsync(async () => {
      return await DB.transaction().execute(async (trx) => {
        const [createListingError] = await createListingWithTrxQuery(
          trx,
          createListingData
        );
        for (const item of facilities) {
          const [createFacilityListingError] =
            await createFacilityAndListingWithTrx(trx, {
              listingId: createListingData.id,
              facilityId: item
            });

          if (createFacilityListingError) {
            throw createFacilityListingError;
          }
        }
        if (createListingError) {
          throw createListingError;
        }
      });
    });

    const [createListingError] = await trx();
    if (createListingError) {
      console.log("createListingError", createListingError);
      return ErrorResponse(res);
    }

    const [listingError, listingResult] = await findListingByIdQuery(
      createListingData.id
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
  async (req: Request<unknown, unknown, CreateListingsDto>, res, next) => {
    const [listingError, listingResult] = await findAllListingQuery(req.query);

    if (listingError) {
      return next(listingError);
    }

    return SuccessResponse(res, listingResult);
  }
);

export const getListingCtl = ctlWrapper(
  async (req: Request<IdDto, unknown, CreateListingsDto>, res, next) => {
    const [listingError, listingResult] = await findListingByIdQuery(
      req.params.id
    );
    if (listingError) {
      return next(listingError);
    }

    if (!listingResult) {
      return NotFoundResponse(res);
    }

    const [userError, user] = await findUserById(listingResult.userId);
    if (userError) {
      return next(userError);
    }

    const listingWithUser = Object.assign({}, listingResult, { user });

    return SuccessResponse(res, listingWithUser);
  }
);

export const getListingFacilitiesCtl = ctlWrapper(
  async (req: Request<IdDto>, res, next) => {
    const [facilitiesError, facilities] = await findListingFacilitiesQuery(
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

    const [updateError, listing] = await reviewListingStatusQuery(
      req.params.id,
      status
    );

    if (updateError) {
      return next(updateError);
    }

    return SuccessResponse(res, listing);
  }
);
