import { z } from "zod";

export const ForgotPassWordSchema = z.object({
    email:z.string().email({message:"Email is required"})
})

export type ForgotPasswordSchema = z.infer<typeof ForgotPassWordSchema>