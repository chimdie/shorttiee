import { z } from "zod";

export const IdDto = z.object({ id: z.string().uuid() });
export type IdDto = z.infer<typeof IdDto>;
