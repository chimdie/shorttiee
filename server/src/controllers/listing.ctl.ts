import assert from "assert";
import { createListingQuery, findListingByIdQuery } from "../db/listing.db";
import { CreateListingsDto } from "../dto/listings.dto";
import { ctlWrapper } from "../utils/ctl-wrapper";
import { ErrorResponse, SuccessResponse } from "../utils/response";
import { Request } from "express";

export const createListingCtl = ctlWrapper(
  async (req: Request<unknown, unknown, CreateListingsDto>, res) => {
    assert(req.user?.id);

    const createListingPayload = Object.assign(
      {
        id: crypto.randomUUID(),
        userId: req.user.id,
        status: "AWAITING_REVIEW" as const
      },
      req.body
    );
    createListingQuery().run(createListingPayload);

    const listing = findListingByIdQuery(createListingPayload.id);
    if (!listing) {
      ErrorResponse(res, "An error occurred while creating listings");
    }

    return SuccessResponse(res, listing, 201);
  }
);
