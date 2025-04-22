import {
  AuthTable,
  CategoryTable,
  FacilityTable,
  FileTable,
  ListingFacilityTable,
  ListingTable,
  ReservationTable,
  UserTable
} from "../dto/types.dto";

export interface Database {
  tblAuthentications: AuthTable;
  tblUsers: UserTable;
  tblListings: ListingTable;
  tblReservations: ReservationTable;
  tblFacilities: FacilityTable;
  tblCategories: CategoryTable;
  tblListingsFacilities: ListingFacilityTable;
  tblFiles: FileTable;
}
