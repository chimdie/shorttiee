import { WithDBTimestamps } from "../types/utils";

export type User = WithDBTimestamps<{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  businessName?: string;
  referrerCode?: string;
  address?: string;
}>;

export type Auth = WithDBTimestamps<{
  id: string;
  hash: string;
  userId: string;
}>;
