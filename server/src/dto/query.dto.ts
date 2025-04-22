import { COMPARISON_OPERATORS } from "kysely";
import { z } from "zod";

const filters = COMPARISON_OPERATORS;

const filterSchema = z
  .string()
  .transform(jsonTransform)
  .pipe(
    z.array(
      z.tuple([
        z.string(),
        z.enum(filters, { message: "Invalid query operation" }),
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
