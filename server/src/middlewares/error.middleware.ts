import {Request, Response, NextFunction} from 'express';
import httpStatus from 'http-status';
import {AppError} from '../utils';
import {EAppError} from '../types';

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
