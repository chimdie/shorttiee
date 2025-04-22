import { z } from "zod";
import { OmitTimestamps } from "../types/utils";
import { FileTable } from "./types.dto";

export const FileDto = z.object({
  path: z.string(),
  filename: z.string(),
  contentType: z.string(),
  checksum: z.string(),
  size: z.number(),
  ownerId: z.string()
}) satisfies z.ZodType<OmitTimestamps<FileTable>>;

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

export const CreateFileDocDto = z.object({
  files: z.array(z.string())
});
export type CreateFileDocDto = z.infer<typeof CreateFileDocDto>;

export const FindFileDto = z.object({
  name: z.string()
});
export type FindFileDto = z.infer<typeof FindFileDto>;
