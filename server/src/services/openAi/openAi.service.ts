import OpenAI from "openai";
import axios, { AxiosResponse } from "axios";
import { appConfig } from "../../configs";

const openai = new OpenAI({
  apiKey: appConfig.openAiKey,
});

export const callChatGPTWithFunctions = async (
  content: string,
  schema: Record<string, any>
) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0613",
    messages: [
      {
        role: "system",
        content: content,
      },
    ],
    functions: [
      {
        name: "dialogue",
        parameters: schema,
      },
    ],
    function_call: "auto",
    max_tokens: 200,
  });

  const completion = response.choices[0].message.content;

  return completion;
};
