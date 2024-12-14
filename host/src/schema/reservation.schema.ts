import { z } from "zod";

export const rejectReasons = [
  { key: "payment", label: "Payment not received" },
  { key: "cancelled", label: "Booking canceled by guest" },
  { key: "overbooking", label: "Overbooking issue" },
  { key: "invalid", label: "Invalid reservation details" },
  { key: "underage", label: "Guest did not meet age requirements" },
];

export const AcceptReservationSchema = z.object({
  reserveNo: z.string({ message: "Reservation Number is required" }),
  account: z.string({ message: "Payment Account is required" }),
  accountName: z.string({ message: "Account Name is required" }),
  bankName: z.string({ message: "Bank Name is required" }),
  additionalInfo: z.string().optional(),
});

export const RejectedReservationSchema = z.object({
  reserveNo: z.string({ message: "Reservation Number is required" }),
  reason: z.string({ message: "Reason is required" }),
});

export type AcceptReservationSchema = z.infer<typeof AcceptReservationSchema>;
export type RejectedReservationSchema = z.infer<typeof RejectedReservationSchema>;
