import { z } from "zod";

export const AcceptReservationSchema = z.object({
  reserveNo: z.string({ message: "Reservation Number is required" }),
  account: z.string({ message: "Payment Account is required" }),
  accountName: z.string({ message: "Account Name is required" }),
  bankName: z.string({ message: "Bank Name is required" }),
  additionalInfo: z.string().optional(),
});

export type AcceptReservationSchema = z.infer<typeof AcceptReservationSchema>;
