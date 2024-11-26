import { z } from "zod";
import { PopulatedEntity } from "../types/utils";

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
  type: z.union([
    z.literal("SHORTLET"),
    z.literal("RENTAL"),
    z.literal("SALE")
  ]),
  status: z.union([
    z.literal("AWAITING_REVIEW"),
    z.literal("REJECTED"),
    z.literal("APPROVED")
  ]),
  description: z.string().nullish(),
  price: z.number().nullish(),
  rate: z.number().nullish(),
  facilities: z.array(z.string()).nullish(),
  restrictions: z.string().nullish(),
  images: z
    .array(z.string().url())
    .min(3, { message: "Minimum of 3 images" })
    .max(6, { message: "Maximum of 6 images" }),

  // references
  userId: z.string().uuid(),
  categoryId: z.string().uuid()
});

export type ListingDto = z.infer<typeof ListingDto>;
export type PopulatedListings = PopulatedEntity<ListingDto>;

export const CreateListingsDto = ListingDto.omit({
  userId: true,
  id: true,
  status: true
});
export type CreateListingsDto = z.infer<typeof CreateListingsDto>;

export const UpdateListingsDto = CreateListingsDto.partial();
export type UpdateListingsDto = z.infer<typeof UpdateListingsDto>;
