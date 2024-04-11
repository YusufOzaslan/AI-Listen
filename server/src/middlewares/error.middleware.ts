import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { AppError } from "../utils";
import { EAppError, ENodeEnvironment } from "../types";
import { logger } from "../configs";

export const errorConverter = (
  err: any,
  _: Request,
  __: Response,
  next: NextFunction
) => {
  let error = err;
  if (!(error instanceof AppError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message =
      statusCode === 500
        ? EAppError.INTERNAL_SERVER_ERROR
        : error.message || EAppError.INTERNAL_SERVER_ERROR;
    error = new AppError(statusCode, message, false, err.stack);
  }
  next(error);
};

export const errorHandler = async (
  err: AppError,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  let { statusCode, message } = err;
  if (
    [ENodeEnvironment.PRODUCTION].includes(process.env.NODE_ENV as any) &&
    !err.isOperational
  ) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = EAppError.INTERNAL_SERVER_ERROR;
  }

  const response = {
    code: statusCode,
    message,
    ...(process.env.NODE_ENV === ENodeEnvironment.DEVELOPMENT && {
      stack: err.stack,
    }),
  };

  logger.error(err.message);
  res.status(statusCode).send(response);
};
