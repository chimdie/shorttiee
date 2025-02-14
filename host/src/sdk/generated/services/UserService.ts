/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UpdateUserDto } from "../models/UpdateUserDto";
import type { UserProfileResponse } from "../models/UserProfileResponse";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class UserService {
  /**
   * Get current user profile
   * Get current user profile
   * @returns UserProfileResponse Success
   * @throws ApiError
   */
  public static getApiV1UsersProfile(): CancelablePromise<UserProfileResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/users/profile",
    });
  }
  /**
   * Update current user profile
   * Update current user profile
   * @param requestBody
   * @returns UserProfileResponse Success
   * @throws ApiError
   */
  public static patchApiV1UsersProfile(
    requestBody?: UpdateUserDto,
  ): CancelablePromise<UserProfileResponse> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/v1/users/profile",
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
