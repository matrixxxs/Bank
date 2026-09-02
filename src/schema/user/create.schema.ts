import z from "zod";

export const createUserSchema = z.object({
  first_name: z.string().min(2),
  middle_name: z.string().min(2),
  last_name: z.string().min(2),
});
