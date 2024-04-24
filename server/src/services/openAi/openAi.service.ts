import OpenAI from "openai";
import { v4 } from "uuid";
import { appConfig } from "../../configs";
import axios from "axios";
import fs from "fs";
import path from "path";

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
  const tempImagePrompt = `Image must be extremely realistic. There must be two people in the image and their face should be seen clearly. Create a picture suitable for the dialogue produced for the English listening activity. There must be two people in the picture. The faces of the people speaking must be visible in the picture. They should talk while looking at each other. Ditalogue: ${content}`;
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: tempImagePrompt,
    n: 1,
    size: "1024x1024",
  });
  const image_url = response.data[0].url;

  const image = await axios.get(image_url!, { responseType: "stream" });
  const imagePath = path.join(`${v4()}.png`);
  const writer = fs.createWriteStream(imagePath);
  image.data.pipe(writer);
  await new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });

  return imagePath;
};

export const openAiService = {
  callChatGPTWithFunctions,
  generateImage,
};
