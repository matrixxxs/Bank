import type { Request, Response, NextFunction } from "express";

export class ApendError extends Error {
  public readonly statusCode: number;
  public readonly isOptional: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOptional = true;
  }
}

export class ValidationError extends ApendError {
  constructor(message: string) {
    super(message, 400);
  }
}
export class NotFound extends ApendError {
  constructor(message: string) {
    super(message, 404);
  }
}
export class BadRequest extends ApendError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class UnAuthorized extends ApendError {
  constructor(message: string) {
    super(message, 403);
  }
}

export class UnAuthentication extends ApendError {
  constructor(message: string) {
    super(message, 401);
  }
}

export const errorRequest = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ApendError) {
    res.status(err.statusCode).json(err.message);
  }
  console.log(err.message);
  res.status(500).json("something went wrong");
};
