import type { Request, Response, NextFunction } from "express";
import { balanceService } from "../../services/user/balance.services.js";
export const getBalance = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user_id = req.user_id;

    const balance = await balanceService(user_id);

    res.status(200).json({
      success: true,
      message: "Balance retrieved successfully",
      data: balance,
    });
  } catch (error) {
    next(error);
  }
};
