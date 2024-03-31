import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils";
import { User } from "../models";

const auth = () =>
  catchAsync(async (req: Request, _: Response, next: NextFunction) => {
    const user = await User.findById(req.session.userID);
    if (!user) throw new Error(`${httpStatus.BAD_REQUEST}, User not found`);

    if (user.role != ("teacher" || "admin")) {
      throw new Error(`${httpStatus.BAD_REQUEST}, FORBIDDEN`);
    }
    next();
  });

export { auth };
