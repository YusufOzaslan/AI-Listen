import dotenv from "dotenv";
import Joi from "joi";
import { ENodeEnvironment } from "../types";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const envVariablesSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid(...Object.values(ENodeEnvironment)),
    HOST: Joi.string().required(),
    PORT: Joi.number().required(),
  })
  .unknown();

const { value: envVariables, error } = envVariablesSchema
  .prefs({
    errors: { label: "key" },
  })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
export const appConfig = {
  env: envVariables.NODE_ENV,
  host: envVariables.HOST,
  port: envVariables.PORT,
};
