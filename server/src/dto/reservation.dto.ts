import { z } from "zod";

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
  /**
   * The user creating the reservation
   */
  userId: z.string().uuid(),
  listingId: z.string().uuid(),
  listingOwnerId: z.string().uuid()
});

export type ReservationDto = z.infer<typeof ReservationDto>;

// create
export const CreateReservationDto = ReservationDto.pick({
  startDate: true,
  endDate: true,
  listingId: true
});
export type CreateReservationDto = z.infer<typeof CreateReservationDto>;
