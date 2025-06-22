import { z } from "zod";
import os from "node:os";
import { Expand } from "../types/utils";

const AppEnv = z.union([
  z.literal("development"),
  z.literal("test"),
  z.literal("staging"),
  z.literal("production")
]);
type AppEnv = z.infer<typeof AppEnv>;

const BaseEnv = z.object({
  PORT: z.coerce.number(),
  JWT_SECRET: z.string(),

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
  ADMIN_PASS: z.string(),

  /** env */
  APP_ENV: AppEnv,

  /** db */

  DB_NAME: z.string(),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.coerce.number()
});

/**
 *@description for validation `process.env`
 */
export const EnvDto = BaseEnv;

export type EnvDto = Expand<z.infer<typeof EnvDto>>;
