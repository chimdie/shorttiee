import { z } from "zod";
import os from "node:os";

const SqliteEnv = z.object({
  /**
   * @example "sqlite3:db/db.sqlite3"
   */
  DB_PATH: z.string()
});

const AppEnv = z.union([
  z.literal("development"),
  z.literal("test"),
  z.literal("staging"),
  z.literal("production")
]);
type AppEnv = z.infer<typeof AppEnv>;

const PostgessEnv = z.object({
  DB_NAME: z.string(),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.coerce.number()
});

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
  ADMIN_PASS: z.string()
});

/**
 *@description for validation `process.env`
 */
export const EnvDto = z.discriminatedUnion("APP_ENV", [
  z
    .object({
      APP_ENV: z.literal<Extract<AppEnv, "development">>("development")
    })
    .merge(SqliteEnv)
    .merge(BaseEnv),
  z
    .object({ APP_ENV: z.literal<Extract<AppEnv, "test">>("test") })
    .merge(SqliteEnv)
    .merge(BaseEnv),
  z
    .object({ APP_ENV: z.literal<Extract<AppEnv, "staging">>("staging") })
    .merge(PostgessEnv)
    .merge(BaseEnv),
  z
    .object({ APP_ENV: z.literal<Extract<AppEnv, "production">>("production") })
    .merge(PostgessEnv)
    .merge(BaseEnv)
]);

export type EnvDto = z.infer<typeof EnvDto>;
