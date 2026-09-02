import z from "zod";

export const transferSchema = z.object({
  account_number: z.string().min(9).max(10),
});
