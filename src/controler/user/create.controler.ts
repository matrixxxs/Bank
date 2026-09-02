import type { Request, Response, NextFunction } from "express";
import { createUserService } from "../../services/user/create.services.js";
import { createUserSchema } from "../../schema/user/create.schema.js";
export const createUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user_id = req.user_id as string;
    const data = createUserSchema.parse(req.body);
    const result = createUserService(data, user_id);
    res.status(200).json(result);
  } catch (error) {
    throw next(error);
  }
};
