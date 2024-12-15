import { z } from "zod";

export const UserDto = z.object({
  id: z.string().trim(),
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  email: z.string().email().trim(),
  mobileNumber: z.string().trim(),
  businessName: z.string().nullish(),
  referrerCode: z.string().nullish(),
  address: z.string().nullish(),
  photo: z.string().nullish(),
  role: z.union([z.literal("ADMIN"), z.literal("USER")]),
  gender: z.union([z.literal("M"), z.literal("F")]).nullish()
});

export type UserDto = z.infer<typeof UserDto>;

//
export const UpdateUserDto = UserDto.pick({
  firstName: true,
  lastName: true,
  mobileNumber: true,
  businessName: true,
  address: true,
  photo: true,
  gender: true
}).partial();

export type UpdateUserDto = z.infer<typeof UpdateUserDto>;
