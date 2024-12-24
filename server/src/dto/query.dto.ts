import { z } from "zod";

const filterSchema = z
  .string()
  .transform(jsonTransform)
  .pipe(
    z.array(
      z.tuple([
        z.string(),
        z.union(
          [
            z.literal("eq"),
            z.literal("gt"),
            z.literal("lt"),
            z.literal("gte"),
            z.literal("lte"),
            z.literal("in"),
            z.literal("between"),
            z.literal("like"),
            z.literal("exists"),
            z.literal("ne"),
            z.literal("nin"),
            z.literal("not between"),
            z.literal("not like")
          ],
          { message: "Invalid query operation" }
        ),
        z.string().or(z.array(z.any()))
      ])
    )
  )
  .optional();

export const RequestQuery = z.object({
  filter: filterSchema,
  or_filter: filterSchema,
  limit: z.number().positive().optional(),
  shift: z.coerce.boolean().optional()
});

export type RequestQuery = z.infer<typeof RequestQuery>;

function jsonTransform(val: string, ctx: z.RefinementCtx) {
  try {
    return JSON.parse(val);
  } catch (_) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Invalid JSON"
    });
  }
}
