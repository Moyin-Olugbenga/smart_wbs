import {z} from "zod";


export const authSchema = z.object({
    username: z
        .string({ error: "Username name is required" })
        .min(3, {message: "Username name must be at least 3 characters long"}),
    password: z.string()
      .refine((password) => /[A-Z]/.test(password), {
        message: "Password must contain at least one uppercase letter.",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "Password must contain at least one lowercase letter.",
      })
})