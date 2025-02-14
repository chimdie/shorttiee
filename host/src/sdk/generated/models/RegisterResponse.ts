/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserDto } from "./UserDto";
export type RegisterResponse = {
  message: string;
  data: UserDto & {
    token: string;
  };
};
