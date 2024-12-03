import { CreateFacilityDto } from "../dto/facility.dto";
import { ctlWrapper } from "../utils/ctl-wrapper";
import type { Request } from "express";
import {
  BadRequestResponse,
  ErrorResponse,
  NotFoundResponse,
  SuccessResponse
} from "../utils/response";
import {
  createFacilityQuery,
  findAllFacilitiesQuery,
  findFacilityByIdQuery,
  findFacilityByNameQuery
} from "../db/facility.db";
import { WithId } from "../types/utils";
import { IdDto } from "../dto/util.dto";

export const createFacilityCtl = ctlWrapper(
  async (req: Request<any, any, CreateFacilityDto>, res) => {
    const [oldFacilityError, oldFacilityResult] = findFacilityByNameQuery(
      req.body.name
    );

    if (oldFacilityError) {
      return ErrorResponse(res);
    }

    if (oldFacilityResult) {
      return BadRequestResponse(res, "Facility already exist");
    }

    const payload: WithId<CreateFacilityDto> = Object.assign(
      { id: crypto.randomUUID() },
      req.body
    );
    const [createFacilityError] = createFacilityQuery(payload);

    if (createFacilityError) {
      return ErrorResponse(res, "An error occurred while creating facility");
    }

    const [facilityError, facilityResult] = findFacilityByIdQuery(payload.id);

    if (facilityError || !facilityResult) {
      return ErrorResponse(res, "An error occurred while creating facility");
    }

    return SuccessResponse(res, facilityResult, 201);
  }
);

export const getAllFacilityCtl = ctlWrapper(async (_req, res) => {
  const [facilityError, facilityResult] = findAllFacilitiesQuery();

  if (facilityError) {
    return ErrorResponse(res);
  }

  return SuccessResponse(res, facilityResult);
});

export const getFacilityCtl = ctlWrapper(async (req: Request<IdDto>, res) => {
  const [facilityError, facilityResult] = findFacilityByIdQuery(req.params.id);

  if (facilityError) {
    return ErrorResponse(res);
  }

  if (!facilityResult) {
    return NotFoundResponse(res);
  }

  return SuccessResponse(res, facilityResult);
});
