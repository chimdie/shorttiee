/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ReservationDto = {
  id: string;
  code: string;
  amount: number;
  startDate: string;
  endDate: string;
  status?: "ACCEPTED" | "PENDING" | "REJECTED";
  userId: string;
  listingId: string;
  listingOwnerId: string;
};
