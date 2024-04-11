import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { catchAsync, AppError } from "../utils";
import { User } from "../models";
import { EUserRole, ICurrentUser, EAppError } from "../types";
import { tokenService } from "../services";

declare global {
  namespace Express {
    interface Request {
      currentUser?: ICurrentUser;
    }
  }
}

const auth = (...requiredRole: EUserRole[]) =>
  catchAsync(async (req: Request, _: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
      throw new AppError(httpStatus.UNAUTHORIZED, EAppError.UNAUTHORIZED);
    }

    const token = req.headers.authorization.replace("Bearer ", "");
    const { id, role } = await tokenService.verifyAccessToken(token);
    const user = await User.findOne({ _id: id, role });
    if (!user)
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        EAppError.INVALID_ACCESS_TOKEN
      );

    if (requiredRole.length && !requiredRole.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, EAppError.FORBIDDEN);
    }
    req.currentUser = user;
    next();
  });

export { auth };
