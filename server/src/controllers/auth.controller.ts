import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils";
import { authService, tokenService } from "../services";
import { IUserAttributes } from "../models";
import { appConfig } from "../configs";

const signUp = catchAsync(async (req: Request, res: Response) => {
  const attrs: IUserAttributes = req.body;
  const user = await authService.signUp(attrs);
  const accessToken = await tokenService.generateAccessToken({
    id: user.id,
    role: user.role,
  });

  const refreshToken = await tokenService.generateRefreshToken({
    id: user.id,
    role: user.role,
  });

  res.cookie(
    appConfig.authCookie.name,
    refreshToken.value,
    appConfig.authCookie.config
  );

  res.status(httpStatus.CREATED).send({
    user,
    accessToken,
  });
});

const signIn = catchAsync(async (req: Request, res: Response) => {
  const attrs: Pick<IUserAttributes, "email" | "password"> = req.body;
  const user = await authService.signIn(attrs);

  const accessToken = await tokenService.generateAccessToken({
    id: user.id,
    role: user.role,
  });

  const refreshToken = await tokenService.generateRefreshToken({
    id: user.id,
    role: user.role,
  });

  res.cookie(
    appConfig.authCookie.name,
    refreshToken.value,
    appConfig.authCookie.config
  );

  res.status(httpStatus.OK).send({
    user,
    accessToken,
  });
});

const signOut = catchAsync(async (req: Request, res: Response) => {
  const cookies = req.cookies;
  await authService.signOut(cookies[appConfig.authCookie.name]);
  res.clearCookie(appConfig.authCookie.name);
  res.status(httpStatus.NO_CONTENT).send();
});

const refresh = catchAsync(async (req: Request, res: Response) => {
  const cookies = req.cookies;
  const result = await authService.refresh(cookies[appConfig.authCookie.name]);
  res.status(httpStatus.OK).send(result);
});

export const authController = { signUp, signIn, signOut, refresh };
