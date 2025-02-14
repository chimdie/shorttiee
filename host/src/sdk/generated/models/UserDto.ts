/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * User model
 */
export type UserDto = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  businessName?: string | null;
  referrerCode?: string | null;
  address?: string | null;
  photo?: string | null;
  role: "USER" | "ADMIN";
  gender?: "M" | "F" | null;
  createdAt: string;
  updatedAt: string;
};
