import { z } from "zod";
import { passwordValidation } from "../ResetPassword/resetPassword.schema";

export const SignUpSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  phone: z
    .string()
    .min(1, { message: "Phone Number is required" })
    .max(11, { message: "Phone number must not exceed 11 numbers" }),
  email: z.string().email({ message: "Email is required" }),
  home: z.string().min(1, { message: "Home Address is required" }),
  bussinessName: z.string().optional(),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .regex(passwordValidation, { message: "Password must Contain at least z unique characters" }),
  terms: z.boolean(),
});

export type SignUpSchema = z.infer<typeof SignUpSchema>;
