import OpenAI from "openai";
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
    messages: [{ role: "assistant", content }],
    tools: [
      {
        type: "function",
        function: {
          name: "ListeningPractice",
          parameters: schema,
        },
      },
    ],
    tool_choice: "auto",
  });

  const willInvokeFunction = response.choices[0].finish_reason == "tool_calls";
  if (willInvokeFunction) {
    const completion =
      response.choices[0].message.tool_calls![0].function.arguments;
    return completion;
  } else {
    return "wrong_content";
  }
};
