import {z} from 'zod';
import validator from 'validator';

export const GenderKey = {
  male: 'M',
  female: 'F',
} as const;

export type GenderKey = (typeof GenderKey)[keyof typeof GenderKey];

export const LoginSchema = z.object({
  email: z
    .string()
    .email()
    .trim()
    .transform(val => val.toLowerCase()),
  password: z.string().min(8).max(60).trim(),
});

export const SignupSchema = z.object({
  firstName: z.string().min(2).trim(),
  lastName: z.string().min(2).trim(),
  address: z.string(),
  password: z.string().min(8).max(60).trim(),
  gender: z.enum([GenderKey.male, GenderKey.female]),
  referralCode: z.string().optional(),
  email: z
    .string({message: 'Email is required'})
    .email({message: 'Incorrect email format'})
    .trim()
    .transform(val => val.toLowerCase()),
  mobileNumber: z
    .string({message: 'Phone number is incorrect'})
    .trim()
    .transform(val => {
      const countryCode = '+234';
      if (val.startsWith('0')) {
        return countryCode + val.substring(1);
      }

      if (val.length < 11) {
        return countryCode + val;
      }

      return val;
    })
    .refine(data => validator.isMobilePhone(data, 'en-NG')),
});

export const ForgotPasswordSchema = z.object({
  email: z
    .string({message: 'Email is required'})
    .email({message: 'Incorrect email format'}),
});

export const EditProfileSchema = SignupSchema.pick({
  firstName: true,
  lastName: true,
  gender: true,
  email: true,
  mobileNumber: true,
});

export type LoginSchema = z.infer<typeof LoginSchema>;
export type SignupSchema = z.infer<typeof SignupSchema>;
export type ForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>;
export type EditProfileSchema = z.infer<typeof EditProfileSchema>;
