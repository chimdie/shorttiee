import { defineAbility, MongoAbility } from "@casl/ability";
import { ListingDto } from "../dto/listings.dto";
import { FileDto } from "../dto/file.dto";
import { CategoryDto } from "../dto/category.dto";
import { FacilityDto } from "../dto/facility.dto";
import { UserDto } from "../dto/user.dto";
import { Actions, Subjects } from "../types/abilities";
import { ReservationDto } from "../dto/reservation.dto";

export function defineAbilityFor(user: UserDto) {
  return defineAbility<MongoAbility<[Actions, Subjects]>>((can) => {
    if (user.role === "ADMIN") {
      can("manage", "all");
      return;
    }

    can<UserDto>("read", "user");
    can<UserDto>("update", "user", { id: user.id }).because("Not your account");

    if (user.businessName?.trim()) {
      can<ListingDto>("create", "listing");
      can<ListingDto>("read", "listing", { userId: user.id });
      can<ReservationDto>("read", "reservation", { listingOwnerId: user.id });
    } else {
      can<ReservationDto>("create", "reservation");
      can<ReservationDto>("read", "reservation", { userId: user.id });
    }

    can<FileDto>(["read", "create"], "file");
    can<ListingDto>("read", "listing", { status: { $in: ["APPROVED"] } });
    can<CategoryDto | FacilityDto>("read", ["category", "facility"]);
  });
}
