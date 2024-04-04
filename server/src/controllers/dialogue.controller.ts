import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils";
import { dialogueService } from "../services";

const generateDialogueController = catchAsync(
  async (req: Request, res: Response) => {
    const dialogue = await dialogueService.generateDialogue(req.body);
    res.status(httpStatus.OK).send(dialogue);
  }
);

const generateDialogueSpeechController = catchAsync(
  async (req: Request, res: Response) => {
    const dialogue = await dialogueService.generateDialogueSpeech(req.body);
    res.status(httpStatus.OK).send(dialogue);
  }
);

const generateIdeasController = catchAsync(
  async (req: Request, res: Response) => {
    const ideas = await dialogueService.generateIdeas(req.body);
    res.status(httpStatus.OK).send(ideas);
  }
);

const generateDialogueImage = catchAsync(
  async (req: Request, res: Response) => {
    const image = await dialogueService.generateDialogueImage(req.body);
    res.status(httpStatus.OK).send(image);
  }
);

export const dialogueController = {
  generateDialogueController,
  generateDialogueSpeechController,
  generateIdeasController,
  generateDialogueImage,
};
