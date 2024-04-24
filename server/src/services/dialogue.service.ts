import { openAiService } from "./openAi";
import {
  ideaPrompt,
  ideaSchema,
  dialoguePrompt,
  dialogueSchema,
} from "../prompts";
import { azureSpeechService, azureStorageService } from "./azure";
import { replacePromptPlaceholders } from "../utils/promptUtil";
import { parseAndRepair } from "../utils/repairUtil";
import { ICurrentUser } from "../types";
import { contentService } from "./content.service";
import axios from "axios";
import { appConfig } from "../configs";

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
  const content = await contentService.getContentByIdOne(contentId, user);

  const dialoguesTTS = content.dialogues.map((item, index) => {
    return {
      text: item.text.trim(),
      language: body.voice[0].split("-").slice(0, -1).join("-"),
      voice: body.voice[index % 2],
    };
  });

  const audioPath = await azureSpeechService.ttsDialogue({
    dialoguesTTS,
  });

  const uploadedAudioUrl = await azureStorageService.uploadFile(audioPath);
  content.set({ audio: uploadedAudioUrl });
  await content.save();

  return content;
};

const generateDialogueImage = async (contentId: string, user: ICurrentUser) => {
  const content = await contentService.getContentByIdOne(contentId, user);

  const prompt = content.dialogues
    .map((dialogue) => {
      return `[${dialogue.speaker}]: ${dialogue.text}`;
    })
    .join("\n");

  const imagePath = await openAiService.generateImage(prompt);

  const uploadedImageUrl = await azureStorageService.uploadFile(imagePath);

  const response = await axios.post(appConfig.faceDetectionUri, {
    image_url: uploadedImageUrl,
  });

  content.set({
    imageData: { image: uploadedImageUrl, faces: response.data.faces },
  });
  await content.save();

  return content;
};

export const dialogueService = {
  generateDialogue,
  generateIdeas,
  generateDialogueSpeech,
  generateDialogueImage,
};
