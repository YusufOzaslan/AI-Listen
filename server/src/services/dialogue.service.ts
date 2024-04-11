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
import { ICurrentUser } from "../types";
import { contentService } from "./content.service";
import axios from "axios";

const createMissingDirectories = async (folder_name: string) => {
  const assetsDir = path.join(__dirname, "..", "..", "assets");

  try {
    await fs.promises.access(assetsDir, fs.constants.F_OK);
  } catch (error) {
    await fs.promises.mkdir(assetsDir, { recursive: true });
  }

  const audioDir = path.join(assetsDir, folder_name);
  try {
    await fs.promises.access(audioDir, fs.constants.F_OK);
  } catch (error) {
    await fs.promises.mkdir(audioDir, { recursive: true });
  }
};

const generateDialogue = async (
  {
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
  },
  user: ICurrentUser
) => {
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

  const data: {
    title: string;
    dialogues: {
      speaker: string;
      text: string;
    }[];
  } = parseAndRepair(completion);

  const content = await contentService.createOne({
    user: user._id,
    title: data.title,
    dialogues: data.dialogues,
    audio: "",
    image: "",
  });

  return content;
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

const generateDialogueSpeech = async (
  contentId: string,
  user: ICurrentUser,
  body: { voice: string[] }
) => {
  await createMissingDirectories("audio");

  const content = await contentService.getContentByIdOne(contentId, user);

  const dialoguesTTS = content.dialogues.map((item, index) => {
    return {
      text: item.text.trim(),
      language: body.voice[0].split("-").slice(0, -1).join("-"),
      voice: body.voice[index % 2],
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

  content.set({ audio: audioPath });
  await content.save();

  return content;
};

const generateDialogueImage = async (contentId: string, user: ICurrentUser) => {
  const content = await contentService.getContentByIdOne(contentId, user);

  await createMissingDirectories("images");

  const prompt = content.dialogues
    .map((dialogue) => {
      return `[${dialogue.speaker}]: ${dialogue.text}`;
    })
    .join("\n");

  const image_url = await openAiService.generateImage(prompt);

  // const image = await axios.get(image_url!, { responseType: "stream" });
  // const imagePath = path.join(
  //   __dirname,
  //   "..",
  //   "..",
  //   "assets",
  //   "images",
  //   `${contentId}.png`
  // );
  // const writer = fs.createWriteStream(imagePath);
  // image.data.pipe(writer);
  // await new Promise((resolve, reject) => {
  //   writer.on("finish", resolve);
  //   writer.on("error", reject);
  // });

  // content.set({ image: imagePath });
  content.set({ image: image_url });
  await content.save();

  return content;
};

export const dialogueService = {
  generateDialogue,
  generateIdeas,
  generateDialogueSpeech,
  generateDialogueImage,
};
