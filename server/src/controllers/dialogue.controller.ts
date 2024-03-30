import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils";
import { generateDialogue, generateDialogueSpeech } from "../services";

const generateDialogueController = catchAsync(
  async (req: Request, res: Response) => {
    const dialogue = await generateDialogue(req.body);
    res.status(httpStatus.OK).send(dialogue);
  }
);

const generateDialogueSpeechController = catchAsync(
  async (req: Request, res: Response) => {
    const dialogue = await generateDialogueSpeech(req.body);
    res.status(httpStatus.OK).send(dialogue);
  }
);

export const dialogueController = {
  generateDialogueController,
  generateDialogueSpeechController,
};
