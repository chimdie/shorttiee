import { z } from "zod";

export const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
);

export const ResetPasswordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: "Current Password is required" }),
    newPassword: z
      .string()
      .min(1, { message: "New Password is required" })
      .regex(passwordValidation, { message: "Password must Contain at least 8 unique characters" }),
    confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;
