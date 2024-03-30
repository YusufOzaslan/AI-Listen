import fs from "fs";
import path from "path";
import { azureSpeechService } from "./azure";

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

export const generateDialogueSpeech = async ({
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
