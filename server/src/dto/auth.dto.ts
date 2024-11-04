import { z } from "zod";
import { LoginDto, RegisterDto } from "../docs/auth";

export const RegisterDtoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string()
}) satisfies z.ZodType<RegisterDto>;

export const LoginDtoSchema = z.object({
  email: z.string(),
  password: z.string()
}) satisfies z.ZodType<LoginDto>;
