import { Request, Response, NextFunction } from "express";

export const catchAsync =
  (fn: (req: any, res: Response, next: NextFunction) => void) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
