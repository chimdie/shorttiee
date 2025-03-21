/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ReservationWithUserAndListingDto = {
  id: string;
  code: string;
  amount: number;
  startDate: string;
  endDate: string;
  status?: "ACCEPTED" | "PENDING" | "REJECTED";
  userId: string;
  listingId: string;
  listingOwnerId: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
  };
  listing: {
    name: string;
    address: string;
    type: "SHORTLET" | "RENTAL" | "SALE";
    status: "AWAITING_REVIEW" | "REJECTED" | "APPROVED";
    description?: string | null;
    price?: number | null;
    rate?: number | null;
    restrictions?: string | null;
    images: Array<string>;
    userId: string;
    categoryId: string;
  };
};
