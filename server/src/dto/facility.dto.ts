import { z } from "zod";

export const FacilityDto = z.object({
  id: z.string().uuid(),
  name: z.string().min(3, { message: "Name must be longer that 3 characters" }),
  icon: z.string(),
  comment: z.string().nullish(),
  color: z.string().nullish()
});

export type FacilityDto = z.infer<typeof FacilityDto>;

export const CreateFacilityDto = FacilityDto.pick({
  name: true,
  icon: true,
  comment: true,
  color: true
});

export type CreateFacilityDto = z.infer<typeof CreateFacilityDto>;
