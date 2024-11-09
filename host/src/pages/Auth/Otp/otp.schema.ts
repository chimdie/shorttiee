import { z } from "zod";

export const OtpSchema = z.object({
    pin: z.string().min(6, {message:"Your one-time password must be 6 characters."})
})

export type OtpSchema = z.infer<typeof OtpSchema>