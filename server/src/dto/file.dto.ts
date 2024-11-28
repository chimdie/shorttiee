import { z } from "zod";

export const CreateFileDto = z
  .array(
    z.object({
      fieldname: z.string(),
      originalname: z.string(),
      encoding: z.string(),
      mimetype: z.string(),
      destination: z.string(),
      filename: z.string(),
      path: z.string(),
      size: z.number(),
      hash: z.string()
    })
  )
  .max(6);
export type CreateFileDto = z.infer<typeof CreateFileDto>;
