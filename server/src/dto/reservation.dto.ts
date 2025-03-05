import { z } from "zod";
import { UserDto } from "./user.dto";
import { ListingWithUserDto } from "./listings.dto";

export const ReservationDto = z.object({
  id: z.string(),
  /**
   * @description the reservation code
   * @example
   * RES-069
   */
  code: z.string(),
  amount: z.number(),
  startDate: z
    .string()
    .date("Invalid start date!")
    .refine(
      (d) => {
        const today = new Date().toISOString().split("T")[0];
        return new Date(d) >= new Date(today + "T00:00:00");
      },
      { message: "Reservation date cannot be in the past" }
    ),
  endDate: z
    .string()
    .date("Invalid end date string!")
    .refine(
      (d) => {
        const today = new Date().toISOString().split("T")[0];
        return new Date(d) >= new Date(today + "T23:59:59");
      },
      { message: "Reservation date cannot be in the past" }
    ),
  status: z
    .union([z.literal("ACCEPTED"), z.literal("PENDING"), z.literal("REJECTED")])
    .default("PENDING"),

  /**
   * The user creating the reservation
   */
  userId: z.string().uuid(),
  listingId: z.string().uuid(),
  listingOwnerId: z.string().uuid()
});

export type ReservationDto = z.infer<typeof ReservationDto>;

export const ReservationWithUserAndListingDto = ReservationDto.extend({
  user: UserDto.pick({
    firstName: true,
    lastName: true,
    email: true,
    mobileNumber: true
  }),
  listing: ListingWithUserDto.pick({
    name: true,
    address: true,
    type: true,
    status: true,
    description: true,
    price: true,
    rate: true,
    restrictions: true,
    images: true,
    userId: true,
    categoryId: true
  })
});

export type ReservationWithUserAndListingDto = z.infer<
  typeof ReservationWithUserAndListingDto
>;

// create
export const CreateReservationDto = ReservationDto.pick({
  startDate: true,
  endDate: true,
  listingId: true
});
export type CreateReservationDto = z.infer<typeof CreateReservationDto>;

// review
export const ReviewReservationDto = ReservationDto.pick({ status: true });
export type ReviewReservationDto = z.infer<typeof ReviewReservationDto>;
