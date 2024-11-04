import { z } from "zod";

/**
 *@description for validation `process.env`
 */
export const EnvDto = z.object({
  PORT: z.coerce.number(),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string()
});

export type EnvDto = z.infer<typeof EnvDto>;
