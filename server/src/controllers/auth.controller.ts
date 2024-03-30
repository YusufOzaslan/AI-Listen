import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils";
import { authService } from "../services";
import { IUserAttributes } from "../models";

const signUp = catchAsync(async (req: Request, res: Response) => {
  const attrs: IUserAttributes = req.body;
  const user = await authService.signUp(attrs);
  res.status(httpStatus.CREATED).send(user);
});

const signIn = catchAsync(async (req: Request, res: Response) => {
  const attrs: Pick<IUserAttributes, "email" | "password"> = req.body;
  const user = await authService.signIn(attrs);
  res.status(httpStatus.CREATED).send(user);
});

export const authController = { signUp, signIn };
