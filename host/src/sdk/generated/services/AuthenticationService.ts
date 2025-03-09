/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChangePasswordDto } from '../models/ChangePasswordDto';
import type { ChangePasswordResponse } from '../models/ChangePasswordResponse';
import type { ForgotPasswordDto } from '../models/ForgotPasswordDto';
import type { ForgotPasswordResponse } from '../models/ForgotPasswordResponse';
import type { LoginDto } from '../models/LoginDto';
import type { LoginResponse } from '../models/LoginResponse';
import type { RegisterDto } from '../models/RegisterDto';
import type { RegisterResponse } from '../models/RegisterResponse';
import type { ResetPasswordDto } from '../models/ResetPasswordDto';
import type { ResetPasswordResponse } from '../models/ResetPasswordResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthenticationService {
  /**
   * Create an account
   * Create an account
   * @param requestBody
   * @returns RegisterResponse Account registered
   * @throws ApiError
   */
  public static postApiV1AuthRegister(
    requestBody?: RegisterDto,
  ): CancelablePromise<RegisterResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/auth/register',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Login
   * @param requestBody
   * @returns LoginResponse Success
   * @throws ApiError
   */
  public static postApiV1AuthLogin(
    requestBody?: LoginDto,
  ): CancelablePromise<LoginResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/auth/login',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Forgot password
   * @param requestBody
   * @returns ForgotPasswordResponse Success
   * @throws ApiError
   */
  public static postApiV1AuthForgotPassword(
    requestBody?: ForgotPasswordDto,
  ): CancelablePromise<ForgotPasswordResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/auth/forgot-password',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Reset password
   * @param requestBody
   * @returns ResetPasswordResponse Success
   * @throws ApiError
   */
  public static postApiV1AuthResetPassword(
    requestBody?: ResetPasswordDto,
  ): CancelablePromise<ResetPasswordResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/auth/reset-password',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Change password
   * Change user password. This is used only by authenticated users
   *
   * By default, changing password will invalidate all previously issued tokens.
   * To prevent this behaviour when changing a user password, set `reauth` to `false`
   *
   * @param requestBody
   * @returns ChangePasswordResponse Success
   * @throws ApiError
   */
  public static postApiV1AuthChangePassword(
    requestBody?: ChangePasswordDto,
  ): CancelablePromise<ChangePasswordResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/auth/change-password',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
