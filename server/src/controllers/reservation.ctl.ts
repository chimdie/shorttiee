import { Request } from "express";
import { findListingByIdFilter, findListingByIdQuery } from "../db/listing.db";
import { ctlWrapper } from "../utils/ctl-wrapper";
import {
  CreateReservationDto,
  ReservationDto,
  ReviewReservationDto
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
  findReservationByIdAndUserIdQuery,
  updateResvartionStatusQuery
} from "../db/reservation.db";
import assert from "assert";
import { getDayDuration } from "../utils/get-day-duration";
import { IdDto } from "../dto/util.dto";
import { ForbiddenError, subject } from "@casl/ability";
import { Models } from "../types/abilities";
import { findUserById } from "../db/users.db";

export const createReservationCtl = ctlWrapper(
  async (req: Request<unknown, unknown, CreateReservationDto>, res, next) => {
    assert(req.user);

    const [listingError, listingResult] = await findListingByIdQuery(
      req.body.listingId
    );

    if (listingError) {
      return next(listingError);
    }

    if (!listingResult) {
      return BadRequestResponse(res, "Invalid listing");
    }

    if (listingResult.status !== "APPROVED") {
      return BadRequestResponse(res, "Listing not approved");
    }

    const [codeError, code] = await createReservationCodeQuery();

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

    const [createResError, result] = await createReservationQuery(payload);

    if (createResError) {
      return next(createResError);
    }

    return SuccessResponse(res, result, 201);
  }
);

export const getAllReservationCtl = ctlWrapper(async (req, res, next) => {
  assert(req.user);

  const [reservationError, reservations] =
    await findAllReservationByUserIdQuery(req.user.id, req.query);

  if (reservationError) {
    return next(reservationError);
  }

  return SuccessResponse(res, reservations);
});

export const getReservationCtl = ctlWrapper(
  async (req: Request<IdDto>, res, next) => {
    assert(req.user);
    assert(req.userAbility);

    const [reservationError, reservation] =
      await findReservationByIdAndUserIdQuery(req.params.id, req.user.id);

    if (reservationError) {
      return next(reservationError);
    }

    if (!reservation) {
      return NotFoundResponse(res);
    }

    const [userError, user] = await findUserById(reservation.userId);
    if (userError) {
      return next(userError);
    }

    if (!user) {
      return ErrorResponse(res);
    }

    const [listingError, listing] = await findListingByIdFilter(
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
      ] as const
    );
    if (listingError) {
      return next(listingError);
    }

    const reservationWithUser = Object.assign({}, reservation, {
      user,
      listing
    }); //satisfies ReservationWithUserAndListingDto;

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

export const updateReservationCtl = ctlWrapper(
  async (req: Request<IdDto, unknown, ReviewReservationDto>, res, next) => {
    assert(req.user);

    let status: ReservationDto["status"] =
      req.body.status === "ACCEPT" ? "ACCEPTED" : "REJECTED";

    const [updateError, reservation] = await updateResvartionStatusQuery(
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
