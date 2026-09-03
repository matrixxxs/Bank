import type { Request, Response, NextFunction } from "express";
import { transferService } from "../../services/user/transfer.services.js";
import { transferSchema } from "../../schema/user/transfar.schema.js";
export const transfer = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user_id = req.user_id as string;
    const data = transferSchema.parse(req.body);
    const result = transferService(data, user_id);
    res.status(200).json(result);
  } catch (error) {
    throw next(error);
  }
};
