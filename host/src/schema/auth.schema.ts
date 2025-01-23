import { z } from "zod";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
);

export const genderData = [
  { key: "M", label: "Male" },
  { key: "F", label: "Female" },
];

export const ForgotPassWordSchema = z.object({
  email: z.string({ message: "Email is required" }).email({ message: "Incorrect email format" }),
});

export const LoginSchema = z.object({
  email: z.string({ message: "Email is required" }).email({ message: "Incorrect email format" }),
  password: z.string({ message: "Password is required" }),
});

export const OtpSchema = z.object({
  pin: z.string({ message: "OTP is required" }).min(6, { message: "OTP must be 6 characters." }),
});

export const ResetPasswordSchema = z
  .object({
    currentPassword: z.string({ message: "Current Password is required" }),
    newPassword: z
      .string({ message: "New Password is required" })
      .regex(passwordValidation, { message: "Password must Contain at least 8 unique characters" }),
    confirmPassword: z.string({ message: "Confirm Password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const SignUpSchema = z.object({
  firstName: z
    .string({ message: "First Name is required" })
    .min(2, { message: "First Name is required" }),
  lastName: z
    .string({ message: "Last Name is required" })
    .min(2, { message: "Last Name is required" }),
  gender: z.enum(["M", "F"], { message: "Select your gender" }),
  mobileNumber: z.string({ message: "Phone Number is required" }),
  email: z.string({ message: "Email is required" }).email({ message: "Incorrect email format" }),
  home: z.string({ message: "Home Address is required" }),
  bussinessName: z.string({ message: "Busines Name is required" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must not be less than 6 characters" }),
  // .regex(passwordValidation, { message: "Password must Contain at least unique characters" }),
  terms: z.boolean({ message: "You have to agree to the the terms and conditions" }),
});

export type ForgotPassWordSchema = z.infer<typeof ForgotPassWordSchema>;
export type LoginSchema = z.infer<typeof LoginSchema>;
export type OtpSchema = z.infer<typeof OtpSchema>;
export type ResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;
export type SignUpSchema = z.infer<typeof SignUpSchema>;
