/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateListingResponse } from "../models/CreateListingResponse";
import type { CreateListingsDto } from "../models/CreateListingsDto";
import type { FacilityDto } from "../models/FacilityDto";
import type { GetAllListingResponse } from "../models/GetAllListingResponse";
import type { GetListingResponse } from "../models/GetListingResponse";
import type { ListingsResponse } from "../models/ListingsResponse";
import type { ReviewListingDto } from "../models/ReviewListingDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class ListingService {
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
   * @returns GetAllListingResponse Success
   * @throws ApiError
   */
  public static getApiV1Listings(
    filter?: string,
    orFilter?: string,
    shift?: boolean,
  ): CancelablePromise<GetAllListingResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/listings/",
      query: {
        filter: filter,
        or_filter: orFilter,
        shift: shift,
      },
    });
  }
  /**
   * @param requestBody
   * @returns CreateListingResponse Success
   * @throws ApiError
   */
  public static postApiV1Listings(
    requestBody?: CreateListingsDto,
  ): CancelablePromise<CreateListingResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/listings/",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * @param id
   * @returns FacilityDto Success
   * @throws ApiError
   */
  public static getApiV1ListingsFacilities(id: string): CancelablePromise<Array<FacilityDto>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/listings/{id}/facilities",
      path: {
        id: id,
      },
    });
  }
  /**
   * @param id
   * @returns GetListingResponse Success
   * @throws ApiError
   */
  public static getApiV1Listings1(id: string): CancelablePromise<GetListingResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/listings/{id}",
      path: {
        id: id,
      },
    });
  }
  /**
   * @param id
   * @param requestBody
   * @returns ListingsResponse Success
   * @throws ApiError
   */
  public static patchApiV1Listings(
    id: string,
    requestBody?: ReviewListingDto,
  ): CancelablePromise<ListingsResponse> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/v1/listings/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
