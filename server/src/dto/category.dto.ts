import { z } from "zod";

export const CategoryDto = z.object({
  id: z.string().uuid(),
  name: z
    .string()
    .trim()
    .min(3, { message: "Category name cannot be less that 3" }),
  comment: z.string().trim().nullish()
});
export type CategoryDto = z.infer<typeof CategoryDto>;

export const CreateCategoryDto = CategoryDto.pick({
  name: true,
  comment: true
});
export type CreateCategoryDto = z.infer<typeof CreateCategoryDto>;
