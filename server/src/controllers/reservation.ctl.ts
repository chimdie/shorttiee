import { Request } from "express";
import { findListingByIdFilter, findListingByIdQuery } from "../db/listing.db";
import { ctlWrapper } from "../utils/ctl-wrapper";
import {
  CreateReservationDto,
  ReservationDto,
  ReservationWithUserAndListingDto
} from "../dto/reservation.dto";
import {
  BadRequestResponse,
  ErrorResponse,
  ForbiddenResponse,
  NotFoundResponse,
  SuccessResponse
} from "../utils/response";
import {
  createReservationQuery,
  createReservationCodeQuery,
  findAllReservationByUserIdQuery,
  findReservationByIdAndUserIdQuery
} from "../db/reservation.db";
import assert from "assert";
import { getDayDuration } from "../utils/get-day-duration";
import { IdDto } from "../dto/util.dto";
import { ForbiddenError, subject } from "@casl/ability";
import { Models } from "../types/abilities";
import { findReservationOwnerById } from "../db/users.db";

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
        status: "PENDING" as const,
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

export const getReservationCtl = ctlWrapper(
  async (req: Request<IdDto>, res, next) => {
    assert(req.user);
    assert(req.userAbility);

    const [reservationError, reservation] = findReservationByIdAndUserIdQuery(
      req.params.id,
      req.user.id
    );

    if (reservationError) {
      return next(reservationError);
    }

    if (!reservation) {
      return NotFoundResponse(res);
    }

    const [userError, user] = findReservationOwnerById(reservation.userId);
    if (userError) {
      return next(userError);
    }

    if (!user) {
      return ErrorResponse(res);
    }

    const [listingError, listing] = findListingByIdFilter(
      reservation.listingId,
      [
        "name",
        "address",
        "type",
        "status",
        "description",
        "price",
        "rate",
        "restrictions",
        "images",
        "userId",
        "categoryId"
      ]
    );
    if (listingError) {
      return next(listingError);
    }

    const reservationWithUser = Object.assign({}, reservation, {
      user,
      listing
    }) satisfies ReservationWithUserAndListingDto;

    const cannot = ForbiddenError.from(req.userAbility).unlessCan(
      "read",
      subject<keyof Models, ReservationDto>("reservation", reservationWithUser)
    );

    if (cannot) {
      return ForbiddenResponse(res, cannot.message);
    }

    return SuccessResponse(res, reservationWithUser);
  }
);
