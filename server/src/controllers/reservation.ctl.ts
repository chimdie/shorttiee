import { Request } from "express";
import { findListingByIdQuery } from "../db/listing.db";
import { ctlWrapper } from "../utils/ctl-wrapper";
import { CreateReservationDto, ReservationDto } from "../dto/reservation.dto";
import { BadRequestResponse, SuccessResponse } from "../utils/response";
import {
  createReservationQuery,
  createReservationCodeQuery,
  findAllReservationByUserIdQuery
} from "../db/reservation.db";
import assert from "assert";
import { getDayDuration } from "../utils/get-day-duration";

export const createReservationCtl = ctlWrapper(
  async (req: Request<unknown, unknown, CreateReservationDto>, res, next) => {
    assert(req.user);

    const [listingError, listingResult] = findListingByIdQuery(
      req.body.listingId
    );

    if (listingError) {
      return next(listingError);
    }

    if (!listingResult) {
      return BadRequestResponse(res, "Invalid listing");
    }

    const [codeError, code] = createReservationCodeQuery();

    if (codeError) {
      return next(codeError);
    }

    const amount =
      getDayDuration(req.body.startDate, req.body.endDate) *
      (listingResult.rate ?? 0);

    const payload = Object.assign(
      {
        code,
        userId: req.user.id,
        listingOwnerId: listingResult.userId,
        id: crypto.randomUUID() as string,
        amount
      },
      req.body
    ) satisfies ReservationDto;

    const [createResError, result] = createReservationQuery(payload);

    if (createResError) {
      return next(createResError);
    }

    return SuccessResponse(res, result, 201);
  }
);

export const getAllReservationCtl = ctlWrapper(async (req, res, next) => {
  assert(req.user);

  const [reservationError, reservations] = findAllReservationByUserIdQuery(
    req.user.id,
    req.query
  );

  if (reservationError) {
    return next(reservationError);
  }

  return SuccessResponse(res, reservations);
});
