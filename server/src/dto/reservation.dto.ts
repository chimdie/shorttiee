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
  startDate: z.string().date("Invalid datetime string! Must be UTC."),
  endDate: z.string().date("Invalid datetime string! Must be UTC."),
  /**
   * The user creating the reservation
   */
  userId: z.string().uuid(),
  listingId: z.string().uuid()
});

export type ReservationDto = z.infer<typeof ReservationDto>;

// create
export const CreateReservationDto = ReservationDto.pick({
  startDate: true,
  endDate: true,
  listingId: true
});
export type CreateReservationDto = z.infer<typeof CreateReservationDto>;
