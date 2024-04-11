import OpenAI from "openai";
import { appConfig } from "../../configs";

const openai = new OpenAI({
  apiKey: appConfig.openAiKey,
});

const callChatGPTWithFunctions = async (
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

const generateImage = async (content: string) => {
  const tempImagePrompt = `Create a picture suitable for the dialogue produced for the English listening activity. There must be two people in the picture. The faces of the people speaking must be visible in the picture. They should talk while looking at each other. Ditalogue: ${content}`;
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: tempImagePrompt,
    n: 1,
    size: "1024x1024",
  });
  const image_url = response.data[0].url;
  return image_url;
};

export const openAiService = {
  callChatGPTWithFunctions,
  generateImage,
};
