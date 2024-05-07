import jwt, { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";
import moment from "moment";
import { ETokenType, ITokenPayload, EAppError, EUserRole } from "../types";
import { appConfig } from "../configs";
import { Token } from "../models";
import { AppError } from "../utils";

const generateToken = (
  { id, studentId, role, expiryDate, type }: ITokenPayload,
  secret: string
) => {
  const payload = {
    user: { id, role, studentId },
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

const generateExamToken = async (
  {
    id,
    studentId,
  }: { id: ITokenPayload["id"]; studentId: ITokenPayload["studentId"] },
  duration?: {
    value: number;
    unit: "s" | "m" | "h";
  }
) => {
  const examTokenExpiration = moment().add(
    duration?.value || appConfig.jwt.exam.duration,
    duration?.unit || appConfig.jwt.exam.durationUnit
  );
  const token = generateToken(
    {
      id,
      studentId,
      role: EUserRole.STUDENT,
      expiryDate: examTokenExpiration,
      type: ETokenType.EXAM,
    },
    appConfig.jwt.exam.secret
  );

  return {
    value: token,
    expiryDate: examTokenExpiration,
  };
};

const verifyToken = async (value: string, type: ETokenType, secret: string) => {
  try {
    const payload = jwt.verify(value, secret) as JwtPayload;

    if (payload.type !== type)
      throw new AppError(httpStatus.UNAUTHORIZED, " Invalid Token");

    return payload.user as Pick<ITokenPayload, "id" | "role" | "studentId">;
  } catch (err) {
    throw new AppError(httpStatus.UNAUTHORIZED, EAppError.UNAUTHORIZED);
  }
};

const verifyAccessToken = async (value: string) =>
  verifyToken(value, ETokenType.ACCESS, appConfig.jwt.access.secret);

const verifyRefreshToken = async (value: string) =>
  verifyToken(value, ETokenType.REFRESH, appConfig.jwt.refresh.secret);

const verifyExamToken = async (value: string) =>
  verifyToken(value, ETokenType.EXAM, appConfig.jwt.exam.secret);

export const tokenService = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateExamToken,
  verifyExamToken,
};
