import { z } from "zod";

export const RegisterDto = z.object({
  firstName: z
    .string()
    .min(2, { message: "First-name must contain at least 8 character(s)" }),
  lastName: z
    .string()
    .min(2, { message: "Last-name must contain at least 8 character(s)" }),

  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 character(s)" }),
  mobileNumber: z.string(),
  businessName: z.string().optional(),
  referrerCode: z.string().optional(),
  address: z.string().optional()
});
export type RegisterDto = z.infer<typeof RegisterDto>;

export const LoginDto = z.object({
  email: z.string().email(),
  password: z.string()
});
export type LoginDto = z.infer<typeof LoginDto>;
