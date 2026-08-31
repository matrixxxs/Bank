import z from "zod";
export const signInSchema = z.object({
  emial: z.string().email(),
  bvn: z.string().min(10).max(11),
  password: z.string().min(5),
  user_name: z.string().min(2),
});
