/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateListingResponse } from "../models/CreateListingResponse";
import type { CreateReservationDto } from "../models/CreateReservationDto";
import type { GetAllReservationResponse } from "../models/GetAllReservationResponse";
import type { GetReservationResponse } from "../models/GetReservationResponse";
import type { ReviewReservationDto } from "../models/ReviewReservationDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class ReservationService {
  /**
   * @param requestBody
   * @returns CreateListingResponse Success
   * @throws ApiError
   */
  public static createReservation(
    requestBody?: CreateReservationDto,
  ): CancelablePromise<CreateListingResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/users/reservations/",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * @param filter
   * Available operators include
   *
   * `eq`
   * `gt`
   * `lt`
   * `gte`
   * `lte`
   * `in`
   * `between`
   * `like`
   * `exists`
   * `ne`
   * `nin`
   * `not between`
   * `not like`
   *
   * @param orFilter
   * Available operators include
   *
   * `eq`
   * `gt`
   * `lt`
   * `gte`
   * `lte`
   * `in`
   * `between`
   * `like`
   * `exists`
   * `ne`
   * `nin`
   * `not between`
   * `not like`
   *
   * @param shift Shift decides if the `filter` and `or_filter` conditions are join by `or` or `and`
   *
   * Example
   * filter_condition and or_filter_condition
   * filter_condition or or_filter_condition
   *
   * @returns GetAllReservationResponse Success
   * @throws ApiError
   */
  public static getApiV1UsersReservations(
    filter?: string,
    orFilter?: string,
    shift?: boolean,
  ): CancelablePromise<GetAllReservationResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/users/reservations/",
      query: {
        filter: filter,
        or_filter: orFilter,
        shift: shift,
      },
    });
  }
  /**
   * @param id
   * @returns GetReservationResponse Success
   * @throws ApiError
   */
  public static getApiV1UsersReservations1(id: string): CancelablePromise<GetReservationResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/users/reservations/{id}",
      path: {
        id: id,
      },
    });
  }
  /**
   * @param id
   * @param requestBody
   * @returns GetReservationResponse Success
   * @throws ApiError
   */
  public static patchApiV1UsersReservations(
    id: string,
    requestBody?: ReviewReservationDto,
  ): CancelablePromise<GetReservationResponse> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/v1/users/reservations/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
