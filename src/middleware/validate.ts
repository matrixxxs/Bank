import type { Request, Response, NextFunction } from "express";
import { flattenError, safeParse } from "zod";
import type { ZodSchema } from "zod/v3";
import { ValidationError } from "../error/error.js";
export const ValidateBody =
  <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw new ValidationError(
        JSON.stringify(result.error.flatten().fieldErrors),
      );
    }
    req.body = result.data;
    next();
  };

export const ValidateParam =
  <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      throw new ValidationError(
        JSON.stringify(result.error.flatten().fieldErrors),
      );
    }
    req.params = result.data as any;
    next();
  };
