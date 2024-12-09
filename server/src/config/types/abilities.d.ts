import { User } from "../../dto/types.dto";
import { ListingDto } from "../../dto/listings.dto";
import { FileDto } from "../../dto/file.dto";
import { CategoryDto } from "../../dto/category.dto";
import { FacilityDto } from "../../dto/facility.dto";

export type Actions = "read" | "create" | "update" | "delete" | "manage";
export type Models = {
  user: User;
  listing: ListingDto;
  file: FileDto;
  category: CategoryDto;
  facility: FacilityDto;
};
export type Subjects = "all" | keyof Models | Models[keyof Models];
export type SubjectFields<S> = S extends keyof Models
  ? (keyof Models[S])[]
  : string[];
