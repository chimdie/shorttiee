import { defineAbility, ForbiddenError, MongoAbility } from "@casl/ability";
import { User } from "../dto/types.dto";
import { type Request, type Response, type NextFunction } from "express";
import { ForbiddenResponse } from "../utils/response";
import { ListingDto } from "../dto/listings.dto";
import { FileDto } from "../dto/file.dto";
import { CategoryDto } from "../dto/category.dto";
import { FacilityDto } from "../dto/facility.dto";
import { Actions, SubjectFields, Subjects } from "./types/abilities";

export function defineAbilityFor(user: User) {
  return defineAbility<MongoAbility<[Actions, Subjects]>>((can) => {
    if (user.role === "ADMIN") {
      can("manage", "all");
      return;
    }

    can<User>("read", "user");
    can<User>("update", "user", { id: user.id }).because("Not your account");

    if (user.businessName?.trim()) {
      can<ListingDto>("create", "listing");
      can<ListingDto>("read", "listing", { userId: user.id });
    }

    can<FileDto>(["read", "create"], "file");
    can<ListingDto>("read", "listing", { status: { $in: ["APPROVED"] } });
    can<CategoryDto | FacilityDto>("read", ["category", "facility"]);
  });
}
