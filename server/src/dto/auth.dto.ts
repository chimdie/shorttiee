import validator from "validator";
import { z } from "zod";
import { clone } from "../utils/clone-obj";

const MIN_PASSWORD = 8;
const email = z.string().email().toLowerCase().trim();
const password = z.string().min(MIN_PASSWORD, {
  message: "Password must contain at least 8 character(s)"
});

export const RegisterDto = z.object({
  firstName: z
    .string()
    .min(2, { message: "First-name must contain at least 8 character(s)" }),
  lastName: z
    .string()
    .min(2, { message: "Last-name must contain at least 8 character(s)" }),
  email,
  gender: z
    .union([z.literal("M"), z.literal("F")], {
      errorMap: () => {
        return {
          message: "Gender must be a valid option"
        };
      }
    })
    .nullish(),
  password,
  mobileNumber: z
    .string()
    .refine((data) => validator.isMobilePhone(data, ["en-NG"]), {
      message: "Invalid mobile number"
    }),
  businessName: z.string().optional(),
  referrerCode: z.string().optional(),
  address: z.string().optional()
});
export type RegisterDto = z.infer<typeof RegisterDto>;

export const LoginDto = z.object({ email, password });
export type LoginDto = z.infer<typeof LoginDto>;

export const ForgotPasswordDto = z.object({ email });
export type ForgotPasswordDto = z.infer<typeof ForgotPasswordDto>;

export const ResetPasswordDto = z.object({
  email,
  password,
  otp: z.string().min(4).trim()
});
export type ResetPasswordDto = z.infer<typeof ResetPasswordDto>;

export const ChangePasswordDto = z.object({
  newPassword: clone(password),
  oldPassword: clone(password),
  reauth: z.boolean().optional()
});
export type ChangePasswordDto = z.infer<typeof ChangePasswordDto>;
