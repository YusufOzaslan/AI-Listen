import dotenv from "dotenv";
import Joi from "joi";
import { ENodeEnvironment } from "../types";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const envVariablesSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid(...Object.values(ENodeEnvironment)),
    HOST: Joi.string().required(),
    PORT: Joi.number().required(),

    MONGODB_URI: Joi.string().required(),

    OPENAI_API_KEY: Joi.string().required(),

    AZURE_SPEECH_KEY: Joi.string().required(),
    AZURE_SPEECH_REGION: Joi.string().required(),
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

  openAiKey: envVariables.OPENAI_API_KEY,

  mongodb: {
    uri: envVariables.MONGODB_URI,
  },

  azureSpeech: {
    key: envVariables.AZURE_SPEECH_KEY,
    region: envVariables.AZURE_SPEECH_REGION,
    ttsUri: `https://${envVariables.AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`,
  },
};
