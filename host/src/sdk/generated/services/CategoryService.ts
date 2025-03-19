/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCategoryDto } from "../models/CreateCategoryDto";
import type { CreateCategoryResponse } from "../models/CreateCategoryResponse";
import type { GetAllCategoryResponse } from "../models/GetAllCategoryResponse";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class CategoryService {
  /**
   * Create a category
   * Create a category
   * @param requestBody
   * @returns CreateCategoryResponse Category created
   * @throws ApiError
   */
  public static postApiV1Categories(
    requestBody?: CreateCategoryDto,
  ): CancelablePromise<CreateCategoryResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/categories/",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * Get all categories
   * Get all categories
   * @returns GetAllCategoryResponse Success
   * @throws ApiError
   */
  public static getApiV1Categories(): CancelablePromise<GetAllCategoryResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/categories/",
    });
  }
}
