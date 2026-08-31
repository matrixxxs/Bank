import type { Request, Response, NextFunction } from "express";
import { signInServices } from "../../services/auth/signIn.services.js";
import { signInSchema } from "../../schema/auth/signUp.schema.js";

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = signInSchema.parse(req.body);
    const result = await signInServices(data);
    res.status(200).json(result);
  } catch (error) {}
};
