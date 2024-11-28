import { z } from "zod";

export const FileDto = z.discriminatedUnion("type", [
  z.object({
    path: z.string(),
    filename: z.string(),
    type: z.literal("FILE"),
    contentType: z.string(),
    checksum: z.string(),
    size: z.number(),
    ownerId: z.string()
  }),
  z.object({
    path: z.string(),
    type: z.literal("URL"),
    ownerId: z.string()
  })
]);

export type FileDto = z.infer<typeof FileDto>;

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
