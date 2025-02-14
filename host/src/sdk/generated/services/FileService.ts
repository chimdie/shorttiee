/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFileDto } from "../models/CreateFileDto";
import type { CreateFileResponse } from "../models/CreateFileResponse";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class FileService {
  /**
   * Create a File
   * Create a File
   * @param formData
   * @returns CreateFileResponse File created
   * @throws ApiError
   */
  public static postApiV1Files(formData?: CreateFileDto): CancelablePromise<CreateFileResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/files/",
      formData: formData,
      mediaType: "multipart/form-data",
    });
  }
  /**
   * Get all categories
   * Get all categories
   * @param name
   * @returns any Success
   * @throws ApiError
   */
  public static getApiV1Files(name: string): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/files/{name}",
      path: {
        name: name,
      },
    });
  }
}
