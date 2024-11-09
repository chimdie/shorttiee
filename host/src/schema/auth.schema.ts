import { z } from "zod";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
);

export const ForgotPassWordSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export type ForgotPassWordSchema = z.infer<typeof ForgotPassWordSchema>;

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginSchema = z.infer<typeof LoginSchema>;

export const OtpSchema = z.object({
  pin: z.string().min(6, { message: "Your one-time password must be 6 characters." }),
});

export type OtpSchema = z.infer<typeof OtpSchema>;

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
