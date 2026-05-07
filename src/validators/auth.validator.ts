import { z } from "zod";

export const loginSchema = z.object({
    email: z.string(),
    password: z.string().min(6),
});

export const registerSchema = z.object({
    fullName: z.string().min(2),
    birthDate: z.string(),
    email: z.string(),
    password: z.string().min(6),
});
