import {Request, Response, NextFunction} from 'express';
import {logger} from '../configs';

export const requestLogger =
  () => (req: Request, res: Response, next: NextFunction) => {
    const startTime = process.hrtime.bigint();

    const logRequest = () => {
      const {method, originalUrl} = req;
      const formattedMethod = method.padEnd(6, ' ');
      const formattedUrl = originalUrl.padStart(originalUrl.length + 6, ' ');
      const requestLog = `REQUEST   ${formattedMethod} ${formattedUrl}`;
      logger.info(requestLog);
    };

    const logResponse = () => {
      const {method, originalUrl} = req;
      const status = res.statusCode.toString().padEnd(5, ' ');
      const formattedMethod = method.padEnd(6, ' ');
      const endTime = process.hrtime.bigint();
      const durationInSeconds = `${Number(endTime - startTime) * 1e-6} ms`;
      const responseLog = `RESPONSE  ${formattedMethod} ${status} ${originalUrl} [${durationInSeconds}]`;
      logger.info(responseLog);
    };

    res.on('finish', logResponse);
    logRequest();
    next();
  };
