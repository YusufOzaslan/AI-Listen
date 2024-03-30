import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import httpStatus from "http-status";
import lodash from "lodash";

export const validate =
  (schema: any) => (req: Request, _: Response, next: NextFunction) => {
    const validSchema = lodash.pick(schema, ["body"]);
    const object = lodash.pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: "key" }, abortEarly: false })
      .validate(object);

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(", ");
      return next(new Error(`${httpStatus.BAD_REQUEST}, ${errorMessage}`));
    }
    Object.assign(req, value);
    return next();
  };
