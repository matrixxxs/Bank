import type { Request, Response, NextFunction } from "express";
import { transactionHistoryService } from "../../services/user/transactionHistory.services.js";
export const transactionHistory = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user_id = req.user_id;

    const transactions = await transactionHistoryService(user_id);

    res.status(200).json({
      success: true,
      message: "Transaction history retrieved successfully",
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};
