import { z } from "zod";
import os from "node:os";

/**
 *@description for validation `process.env`
 */
export const EnvDto = z.object({
  PORT: z.coerce.number(),
  JWT_SECRET: z.string(),

  /**
   * @example "sqlite3:db/db.sqlite3"
   */
  DATABASE_URL: z.string(),
  OTP_SIZE: z.coerce.number(),
  /** duration in seconds */
  OTP_TTL: z.coerce.number(),
  UPLOAD_PATH: z.string().default(os.tmpdir()),

  /**
   * @description files size limit in bytes
   * @default 5MiB
   */
  FILE_SIZE_LIMIT: z.coerce.number().default((2 ** 10) ** 2 * 5),

  EMAIL_USER: z.string().email(),
  EMAIL_PASS: z.string(),
  EMAIL_HOST: z.string(),

  /** admin */
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASS: z.string()
});

export type EnvDto = z.infer<typeof EnvDto>;
