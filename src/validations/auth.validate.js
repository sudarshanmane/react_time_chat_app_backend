import { z } from "zod";

export const registerShema = z.object({
  name: z.string().min(6, "Name must be at least 6 chars"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});
