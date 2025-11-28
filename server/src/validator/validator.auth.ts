import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password min 6 characters"),
  role: z
    .string()
    .transform((val) => (val === "" ? "Staff" : val))
    .optional()
    .default("Staff"),
  phone_number: z.string().optional(),
  address: z.string().optional()
});

