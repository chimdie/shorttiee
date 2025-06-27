import { z } from "zod";
import { OmitTimestamps } from "../types/utils";
import { User } from "./types.dto";

export const UserDto = z.object({
  id: z.string().trim(),
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  email: z.string().email().trim(),
  mobileNumber: z.string().trim(),
  businessName: z.string().nullable(),
  referrerCode: z.string().nullable(),
  address: z.string().nullable(),
  photo: z.string().nullable(),
  role: z.enum(["ADMIN", "USER"]),
  gender: z.enum(["M", "F"]).nullable()
}) satisfies z.ZodType<OmitTimestamps<User>>;

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
