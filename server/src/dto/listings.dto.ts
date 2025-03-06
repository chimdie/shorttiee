import { z } from "zod";
import { PopulatedEntity } from "../types/utils";
import { UserDto } from "./user.dto";

export const ListingDto = z.object({
  id: z.string().uuid(),
  name: z
    .string()
    .trim()
    .min(3, { message: "Listing name cannot be less that 3" }),
  address: z
    .string()
    .trim()
    .min(3, { message: "Listing address cannot be less that 3" }),
  type: z.enum(["SHORTLET", "RENTAL", "SALE"]),
  status: z.enum(["AWAITING_REVIEW", "REJECTED", "APPROVED"]),
  description: z.string().nullish(),
  price: z.number().nullish(),
  rate: z.number().nullish(),
  // facilities: z.array(FacilityDto),
  restrictions: z.string().nullish(),
  images: z
    .array(z.string().url({ message: "Images must be valid URL" }))
    .min(3, { message: "Minimum of 3 images" })
    .max(6, { message: "Maximum of 6 images" }),

  // references
  userId: z.string().uuid(),
  categoryId: z.string().uuid()
});

export const ListingWithUserDto = ListingDto.extend({
  user: UserDto.pick({
    firstName: true,
    lastName: true,
    email: true,
    photo: true,
    mobileNumber: true,
    businessName: true
  }).required()
});
export type ListingWithUserDto = z.infer<typeof ListingWithUserDto>;

export const ListingDBDto = ListingDto.omit({
  images: true
}).extend({
  images: z.string()
});
export type ListingDBDto = z.infer<typeof ListingDBDto>;

export type ListingDto = z.infer<typeof ListingDto>;
export type PopulatedListings = PopulatedEntity<ListingDto>;

export const CreateListingsDto = ListingDto.omit({
  userId: true,
  id: true,
  status: true
}).extend({
  facilities: z.array(z.string())
});
export type CreateListingsDto = z.infer<typeof CreateListingsDto>;

// export const UpdateListingsDto = CreateListingsDto.partial();
// export type UpdateListingsDto = z.infer<typeof UpdateListingsDto>;

export const ReviewListingDto = z.object({
  status: z.enum(["ACCEPT", "DECLINE"])
});

export type ReviewListingDto = z.infer<typeof ReviewListingDto>;
