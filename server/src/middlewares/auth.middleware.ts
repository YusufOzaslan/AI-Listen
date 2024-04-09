import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils";
import { User } from "../models";
import { EUserRole, ICurrentUser } from "../types";
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
      throw new Error(`${httpStatus.UNAUTHORIZED}, Authentication required`);
    }

    const token = req.headers.authorization.replace("Bearer ", "");
    const { id, role } = await tokenService.verifyAccessToken(token);
    const user = await User.findOne({ _id: id, role });
    if (!user)
      throw new Error(`${httpStatus.UNAUTHORIZED}, Invalid access token`);

    if (requiredRole.length && !requiredRole.includes(role)) {
      throw new Error(`${httpStatus.UNAUTHORIZED}, Forbidden`);
    }
    req.currentUser = user;
    next();
  });

export { auth };
