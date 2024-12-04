import { z } from "zod";

export const ProfileSchema = z.object({
  email: z.string({ message: "Email is required" }).email({ message: "Incorrect email format" }),
  firstName: z
    .string({ message: "First Name is required" })
    .min(2, { message: "First Name is required" }),
  lastName: z
    .string({ message: "Last Name is required" })
    .min(2, { message: "Last Name is required" }),
  phone: z.string({ message: "Phone Number is required" }),
  home: z.string({ message: "Home Address is required" }),
  bussinessName: z.string().optional(),
});

export type ProfileSchema = z.infer<typeof ProfileSchema>;
