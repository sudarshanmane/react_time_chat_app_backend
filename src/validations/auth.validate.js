import { z } from "zod";

export const registerShema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 chars")
    .max(50, "Name must be less than 50 chars"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 chars")
    .max(100, "Password must be less than 100 chars"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 chars")
    .max(100, "Password must be less than 100 chars"),
});
