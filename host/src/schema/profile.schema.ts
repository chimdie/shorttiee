import { z } from "zod";

export const ProfileSchema = z.object({
  email: z.string({ message: "Email is required" }).email({ message: "Incorrect email format" }),
  firstName: z
    .string({ message: "First Name is required" })
    .min(2, { message: "First Name is required" }),
  lastName: z
    .string({ message: "Last Name is required" })
    .min(2, { message: "Last Name is required" }),
  mobileNumber: z.string({ message: "Phone Number is required" }),
  address: z.string({ message: "Address is required" }),
  bussinessName: z.string({ message: "Business Name is required" }),
  photo: z.string().optional(),
  gender: z.union([z.literal("M"), z.literal("F"), z.null()]).optional(),
});

export type ProfileSchema = z.infer<typeof ProfileSchema>;
