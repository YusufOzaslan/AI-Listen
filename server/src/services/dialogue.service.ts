import { openAiService } from "./openAi";
import {
  ideaPrompt,
  ideaSchema,
  dialoguePrompt,
  dialogueSchema,
} from "../prompts";
import fs from "fs";
import path from "path";
import { azureSpeechService } from "./azure";
import { replacePromptPlaceholders } from "../utils/promptUtil";
import { parseAndRepair } from "../utils/repairUtil";

const createMissingDirectories = async () => {
  const assetsDir = path.join(__dirname, "..", "..", "assets");

  try {
    await fs.promises.access(assetsDir, fs.constants.F_OK);
  } catch (error) {
    await fs.promises.mkdir(assetsDir, { recursive: true });
  }

  const audioDir = path.join(assetsDir, "audio");
  try {
    await fs.promises.access(audioDir, fs.constants.F_OK);
  } catch (error) {
    await fs.promises.mkdir(audioDir, { recursive: true });
  }
};

const generateDialogue = async ({
  level,
  ageGroup,
  numberOfWords,
  listeningTaskOptions,
  listeningTaskCategories,
  ideaGenerator,
  wordsforScript,
}: {
  level: string;
  ageGroup: string;
  numberOfWords: number;
  listeningTaskOptions: string;
  listeningTaskCategories: string;
  ideaGenerator: string;
  wordsforScript: string;
}) => {
  const promptTemplate = dialoguePrompt;
  const prompt = replacePromptPlaceholders(promptTemplate, {
    level,
    ageGroup,
    numberOfWords,
    listeningTaskOptions,
    listeningTaskCategories,
    ideaGenerator,
    wordsforScript,
  });
  const completion = await openAiService.callChatGPTWithFunctions(
    prompt,
    dialogueSchema
  );
  return completion === "wrong_content"
    ? completion
    : parseAndRepair(completion);
};

const generateIdeas = async ({
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
  const completion = await openAiService.callChatGPTWithFunctions(
    prompt,
    ideaSchema
  );
  return completion === "wrong_content"
    ? completion
    : parseAndRepair(completion);
};

const generateDialogueSpeech = async ({
  title,
  dialogues,
  voice,
}: {
  title: string;
  dialogues: {
    speaker: string;
    text: string;
  }[];
  voice: string[];
}) => {
  await createMissingDirectories();

  const dialoguesTTS = dialogues.map((item, index) => {
    return {
      text: item.text.trim(),
      language: voice[0].split("-").slice(0, -1).join("-"),
      voice: voice[index % 2],
    };
  });

  const filename = await azureSpeechService.ttsDialogue({
    dialoguesTTS,
  });

  const targetPath = path.join(
    __dirname,
    "..",
    "..",
    "assets",
    "audio",
    filename
  );
  const audioPath = path.join(__dirname, "..", "..", filename);
  await fs.promises.rename(audioPath, targetPath);

  return filename;
};

const generateDialogueImage = async ({
  title,
  dialogues,
  voice,
}: {
  title: string;
  dialogues: {
    speaker: string;
    text: string;
  }[];
  voice: string[];
}) => {
  const prompt = dialogues
    .map((dialogue) => {
      return `[${dialogue.speaker}]: ${dialogue.text}`;
    })
    .join("\n");
  const image = await openAiService.generateImage(prompt);
  return image;
};
export const dialogueService = {
  generateDialogue,
  generateIdeas,
  generateDialogueSpeech,
  generateDialogueImage
};
