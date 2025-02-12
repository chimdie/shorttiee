/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateListingsDto = {
  name: string;
  address: string;
  type: 'SHORTLET' | 'RENTAL' | 'SALE';
  description?: string | null;
  price?: number | null;
  rate?: number | null;
  facilities: Array<string>;
  restrictions?: string | null;
  images: Array<string>;
  categoryId: string;
};


