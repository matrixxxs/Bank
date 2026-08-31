import type { Request, Response, NextFunction } from "express";
import { UnAuthorized } from "../error/error.js";
import { verifyToken } from "../utils/jwt.js";
export const authMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const header = req.header("Authorization");
    if (!header || !header.startsWith("Bearer ")) {
      throw new UnAuthorized("Access Denied");
    }
    const token = await header.split(" ")[1];
    if (!token) {
      throw new UnAuthorized("Access denied");
    }
    const decode = await verifyToken(token);
    req.user_id = decode.user_id;
    next();
  } catch (error) {
    throw error;
  }
};
