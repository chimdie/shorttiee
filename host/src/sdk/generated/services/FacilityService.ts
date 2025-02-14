/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFacilityDto } from "../models/CreateFacilityDto";
import type { CreateFacilityResponse } from "../models/CreateFacilityResponse";
import type { GetAllFacilityResponse } from "../models/GetAllFacilityResponse";
import type { GetFacilityResponse } from "../models/GetFacilityResponse";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class FacilityService {
  /**
   * Create a facility
   * Create a facility
   * @param requestBody
   * @returns CreateFacilityResponse Facility created
   * @throws ApiError
   */
  public static postApiV1Facilities(
    requestBody?: CreateFacilityDto,
  ): CancelablePromise<CreateFacilityResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/facilities/",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * Get all facilities
   * Get all facilities
   * @returns GetAllFacilityResponse Success
   * @throws ApiError
   */
  public static getApiV1Facilities(): CancelablePromise<GetAllFacilityResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/facilities/",
    });
  }
  /**
   * Get a facility
   * Get all facilities
   * @param id
   * @returns GetFacilityResponse Success
   * @throws ApiError
   */
  public static getApiV1Facilities1(id: string): CancelablePromise<GetFacilityResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/facilities/{id}",
      path: {
        id: id,
      },
    });
  }
}
