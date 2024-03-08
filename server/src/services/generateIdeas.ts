import { callChatGPTWithFunctions } from "./openAi";
import { ideaPrompt, ideaSchema } from "../prompts";
import { replacePromptPlaceholders } from "../utils/promptUtil";

export const generateIdeas = async ({
  level,
  ageGroup,
  numberOfWords,
  listeningTaskOptions,
  listeningTaskCategories,
  ideaGenerator,
}: {
  level: string;
  ageGroup: string;
  numberOfWords: number;
  listeningTaskOptions: string;
  listeningTaskCategories: string;
  ideaGenerator: string;
}) => {
  const promptTemplate = ideaPrompt;
  const prompt = replacePromptPlaceholders(promptTemplate, {
    level,
    ageGroup,
    numberOfWords,
    listeningTaskOptions,
    listeningTaskCategories,
    ideaGenerator,
  });
  const completion = await callChatGPTWithFunctions(prompt, ideaSchema);
  return completion;
  //return articleUtil.processThreeIdeas(completion);
};
