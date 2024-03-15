import { callChatGPTWithFunctions } from "./openAi";
import { dialoguePrompt, dialogueSchema } from "../prompts";
import { replacePromptPlaceholders } from "../utils/promptUtil";
import { parseAndRepair } from "../utils/repairUtil";

export const generateDialogue = async ({
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
  const promptTemplate = dialoguePrompt;
  const prompt = replacePromptPlaceholders(promptTemplate, {
    level,
    ageGroup,
    numberOfWords,
    listeningTaskOptions,
    listeningTaskCategories,
    ideaGenerator,
  });
  const completion = await callChatGPTWithFunctions(prompt, dialogueSchema);
  return parseAndRepair(completion!);
};
