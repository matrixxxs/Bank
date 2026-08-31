import z from "zod";
export const signInSchema = z.object({
  password: z.string().min(5),
  user_name: z.string().min(2),
});
