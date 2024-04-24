import dotenv from "dotenv";
import Joi from "joi";
import { ENodeEnvironment } from "../types";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const envVariablesSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid(...Object.values(ENodeEnvironment)),
    HOST: Joi.string().required(),
    ORIGIN: Joi.string().required(),
    PORT: Joi.number().required(),
    MONGODB_URI: Joi.string().required(),
    FACE_DETECTION_SERVICE_URI: Joi.string().required(),
    OPENAI_API_KEY: Joi.string().required(),
    AZURE_SPEECH_KEY: Joi.string().required(),
    AZURE_SPEECH_REGION: Joi.string().required(),
    AZURE_CONNECTION_STRING: Joi.string().required(),
    AZURE_CONTAINER_NAME: Joi.string().required(),
    AZURE_STORAGE_URI: Joi.string().required(),
    JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
    JWT_ACCESS_TOKEN_DURATION: Joi.number().required(),
    JWT_ACCESS_TOKEN_DURATION_UNIT: Joi.string().required(),
    JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
    JWT_REFRESH_TOKEN_DURATION: Joi.number().required(),
    JWT_REFRESH_TOKEN_DURATION_UNIT: Joi.string().required(),
    AUTH_COOKIE_NAME: Joi.string().required(),
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
  origin: envVariables.ORIGIN,
  port: envVariables.PORT,

  openAiKey: envVariables.OPENAI_API_KEY,

  mongodb: {
    uri: envVariables.MONGODB_URI,
  },

  faceDetectionUri: envVariables.FACE_DETECTION_SERVICE_URI,

  azureSpeech: {
    key: envVariables.AZURE_SPEECH_KEY,
    region: envVariables.AZURE_SPEECH_REGION,
    ttsUri: `https://${envVariables.AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`,
  },

  azureStorage: {
    connectionString: envVariables.AZURE_CONNECTION_STRING,
    containerName: envVariables.AZURE_CONTAINER_NAME,
    uri: envVariables.AZURE_STORAGE_URI,
  },

  jwt: {
    access: {
      secret: envVariables.JWT_ACCESS_TOKEN_SECRET,
      duration: envVariables.JWT_ACCESS_TOKEN_DURATION,
      durationUnit: envVariables.JWT_ACCESS_TOKEN_DURATION_UNIT,
    },
    refresh: {
      secret: envVariables.JWT_REFRESH_TOKEN_SECRET,
      duration: envVariables.JWT_REFRESH_TOKEN_DURATION,
      durationUnit: envVariables.JWT_REFRESH_TOKEN_DURATION_UNIT,
    },
  },

  authCookie: {
    name: envVariables.AUTH_COOKIE_NAME,
    config: {
      httpOnly: envVariables.NODE_ENV === ENodeEnvironment.PRODUCTION,
      maxAge:
        Number(envVariables.JWT_REFRESH_TOKEN_DURATION) *
        24 *
        60 *
        60 *
        60 *
        1000,
      secure: envVariables.NODE_ENV === ENodeEnvironment.PRODUCTION,
    },
  },
};
