/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ListingWithUserDto = {
  id: string;
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
  user: {
    firstName: string;
    lastName: string;
    email: string;
    photo: string | null;
    mobileNumber: string;
    businessName: string | null;
  };
};
