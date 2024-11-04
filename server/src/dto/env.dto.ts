import { z } from "zod";

export const EnvDto = z.object({
  PORT: z.coerce.number(),
  JWT_SECRET: z.string()
});

export type EnvDto = z.infer<typeof EnvDto>;
