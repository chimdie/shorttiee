import { z } from "zod";

/**
 *@description for validation `process.env`
 */
export const EnvDto = z.object({
  PORT: z.coerce.number(),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string(),
  OTP_SIZE: z.coerce.number(),
  /** duration in seconds */
  OTP_TTL: z.coerce.number()

  // EMAIL_USER: z.string().email(),
  // EMAIL_PASS: z.string(),
  // EMAIL_HOST: z.string()
});

export type EnvDto = z.infer<typeof EnvDto>;
