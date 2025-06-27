import { ColumnType, Insertable, Selectable, Updateable } from "kysely";

interface TableGenerated {
  /** uuid */
  id: ColumnType<string, string, never>;
  createdAt: ColumnType<Date, never, never>;
  updatedAt: ColumnType<Date, never, never>;
}

export interface AuthTable extends TableGenerated {
  hash: string;
  userId: string;
  /**
   * a SHA1 hash of `hash`
   * useful for checking changes in the user auth
   *
   * @example invalidate all auth tokens after a password change by checking
   * the nonce in JWT
   */
  nonce: string;
  otp?: string | null;
  /** datetime */
  otpTTL?: string | null;
}
export type Auth = Selectable<AuthTable>;
export type CreateAuth = Insertable<AuthTable>;
export type UpdateAuth = Updateable<AuthTable>;

//
interface UserTable extends TableGenerated {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  role: "USER" | "ADMIN";
  businessName?: string | null | undefined;
  referrerCode?: string | null | undefined;
  address?: string | null | undefined;
  gender?: "M" | "F" | null | undefined;
  photo?: string | null | undefined;
}
export type User = Selectable<UserTable>;
export type CreateUser = Insertable<UserTable>;
export type UpdateUser = Updateable<UserTable>;

//
interface FileTable extends Omit<TableGenerated, "id"> {
  path: string;
  filename: string;
  contentType: string;
  checksum: string;
  size: number;
  ownerId: string;
}
export type File = Selectable<FileTable>;
export type CreateFile = Insertable<FileTable>;
export type UpdateFile = Updateable<FileTable>;

//
interface FacilityTable extends TableGenerated {
  name: string;
  icon: string;
  comment?: string | null | undefined;
  color?: string | null | undefined;
}
export type Facility = Selectable<FacilityTable>;
export type CreateFacility = Insertable<FacilityTable>;
export type UpdateFacility = Updateable<FacilityTable>;

//
interface CategoryTable extends TableGenerated {
  name: string;
  comment?: string | null | undefined;
}
export type Category = Selectable<CategoryTable>;
export type CreateCategory = Insertable<CategoryTable>;
export type UpdateCategory = Updateable<CategoryTable>;

//
interface ListingTable extends TableGenerated {
  name: string;
  address: string;
  type: "SHORTLET" | "RENTAL" | "SALE";
  status: "AWAITING_REVIEW" | "REJECTED" | "APPROVED";
  description?: string | null | string;
  price?: number | null | undefined;
  rate?: number | null | undefined;

  // facilities: array,
  restrictions?: string | null | undefined;
  images: ColumnType<string[], string, never>;
  // references
  userId: string;
  categoryId: string;
}
export type Listing = Selectable<ListingTable>;
export type CreateListing = Insertable<ListingTable>;
export type UpdateListing = Updateable<ListingTable>;

//
interface ReservationTable extends TableGenerated {
  // id: string;
  /**
   * @description the reservation code
   * @example
   * RES-069
   */
  code: string;
  amount: number;
  startDate: string;
  endDate: string;
  /** @default "PENDING" */
  status: "ACCEPTED" | "PENDING" | "REJECTED";
  /**
   * The user creating the reservation
   */
  userId: string;
  listingId: string;
  listingOwnerId: string;
}
export type Reservation = Selectable<ReservationTable>;
export type CreateReservation = Insertable<ReservationTable>;
export type UpdateReservation = Updateable<ReservationTable>;

//
interface ListingFacilityTable {
  facilityId: string;
  listingId: string;
}
export type ListingFacility = Selectable<ListingFacilityTable>;
export type CreateListingFacility = Insertable<ListingFacilityTable>;
export type UpdateListingFacility = Updateable<ListingFacilityTable>;
