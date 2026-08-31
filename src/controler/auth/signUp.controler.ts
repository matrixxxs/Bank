import type { Request, Response, NextFunction } from "express";
import { signUpServices } from "../../services/auth/signUp.services.js";
import { signUpSchema } from "../../schema/auth/signUp.schema.js";
export const signUP = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = signUpSchema.parse(req.body);
    const result = await signUpServices(data);
    res.status(200).json(result);
  } catch (error) {
    throw error;
  }
};
