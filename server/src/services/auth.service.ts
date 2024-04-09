import { ITokenDocument, IUserAttributes, Token, User } from "../models";
import httpStatus from "http-status";
import { tokenService } from "./token.service";
import { ETokenType } from "../types";
import { AppError } from "../utils";
import { EAppError } from "../types";

export const signUp = async (attrs: IUserAttributes) => {
  if (await User.isEmailTaken(attrs.email))
    throw new AppError(httpStatus.UNAUTHORIZED, EAppError.EMAIL_TAKEN);
  const user = User.build(attrs);
  //
  user.save();
  return user;
};

export const signIn = async (
  attrs: Pick<IUserAttributes, "email" | "password">
) => {
  const user = await User.findOne({ email: attrs.email });
  if (!user) throw new AppError(httpStatus.UNAUTHORIZED, EAppError.INVALID_CREDENTIALS);
  if (!(await user.isPasswordCorrect(attrs.password)))
    throw new AppError(httpStatus.UNAUTHORIZED, EAppError.INVALID_CREDENTIALS);
  return user;
};

const signOut = async (refreshToken: string) => {
  if (!refreshToken) return;

  const token: ITokenDocument | null = await Token.findOne({
    type: ETokenType.REFRESH,
    value: refreshToken,
  });
  if (!token) return;
  await token.deleteOne();
};

const refresh = async (refreshToken: string | undefined) => {
  if (!refreshToken)
    throw new AppError(httpStatus.UNAUTHORIZED, EAppError.UNAUTHORIZED);

  const { id } = await tokenService.verifyRefreshToken(refreshToken);

  const token: any = await Token.findOne({
    user: id,
    type: ETokenType.REFRESH,
    value: refreshToken,
  });

  if (!token) throw new AppError(httpStatus.UNAUTHORIZED, EAppError.UNAUTHORIZED);

  const user = await User.findById(token.user);

  if (!user) throw new AppError(httpStatus.UNAUTHORIZED, EAppError.UNAUTHORIZED);

  const accessToken = await tokenService.generateAccessToken({
    id: user.id,
    role: user.role,
  });

  return {
    user,
    accessToken,
  };
};

export const authService = { signUp, signIn, signOut, refresh };
