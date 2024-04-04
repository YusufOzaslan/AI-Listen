import jwt, { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";
import moment from "moment";
import { ETokenType, ITokenPayload, EAppError } from "../types";
import { appConfig } from "../configs";
import { Token } from "../models";
import { AppError } from "../utils";

const generateToken = (
  { id, role, expiryDate, type }: ITokenPayload,
  secret: string
) => {
  const payload = {
    user: { id, role },
    iat: moment().unix(),
    exp: expiryDate.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const generateAccessToken = async ({
  id,
  role,
}: Pick<ITokenPayload, "id" | "role">) => {
  const accessTokenExpiration = moment().add(
    appConfig.jwt.access.duration,
    appConfig.jwt.access.durationUnit
  );
  const token = generateToken(
    {
      id,
      role,
      expiryDate: accessTokenExpiration,
      type: ETokenType.ACCESS,
    },
    appConfig.jwt.access.secret
  );
  return {
    value: token,
    expiryDate: accessTokenExpiration,
  };
};

const generateRefreshToken = async ({
  id,
  role,
}: Pick<ITokenPayload, "id" | "role">) => {
  const refreshTokenExpiration = moment().add(
    appConfig.jwt.refresh.duration,
    appConfig.jwt.refresh.durationUnit
  );
  const token = generateToken(
    {
      id,
      role,
      expiryDate: refreshTokenExpiration,
      type: ETokenType.REFRESH,
    },
    appConfig.jwt.refresh.secret
  );

  await Token.deleteMany({ user: id, type: ETokenType.REFRESH });

  const tokenDoc = Token.build({
    user: id,
    type: ETokenType.REFRESH,
    value: token,
    expiryDate: refreshTokenExpiration.toDate(),
  });

  await tokenDoc.save();

  return {
    value: token,
    expiryDate: refreshTokenExpiration,
  };
};

const verifyToken = async (value: string, type: ETokenType, secret: string) => {
  try {
    const payload = jwt.verify(value, secret) as JwtPayload;

    if (payload.type !== type)
      throw new AppError(httpStatus.UNAUTHORIZED, " Invalid Token");

    return payload.user as Pick<ITokenPayload, "id" | "role">;
  } catch (err) {
    throw new AppError(httpStatus.UNAUTHORIZED, EAppError.UNAUTHORIZED);
  }
};

const verifyAccessToken = async (value: string) =>
  verifyToken(value, ETokenType.ACCESS, appConfig.jwt.access.secret);

const verifyRefreshToken = async (value: string) =>
  verifyToken(value, ETokenType.REFRESH, appConfig.jwt.refresh.secret);

export const tokenService = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
