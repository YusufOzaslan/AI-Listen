import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils";
import { dialogueService } from "../services";

const generateDialogueController = catchAsync(
  async (req: Request, res: Response) => {
    const dialogue = await dialogueService.generateDialogue(
      req.body,
      req.currentUser!
    );
    res.status(httpStatus.OK).send(dialogue);
  }
);

const generateDialogueSpeechController = catchAsync(
  async (req: Request, res: Response) => {
    const dialogue = await dialogueService.generateDialogueSpeech(
      req.params.id,
      req.currentUser!,
      req.body
    );
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
    const image = await dialogueService.generateDialogueImage(
      req.params.id,
      req.currentUser!
    );
    res.status(httpStatus.OK).send(image);
  }
);

const generateQuestionsByContentId = catchAsync(
  async (req: Request, res: Response) => {
    const questions = await dialogueService.generateQuestionsByContentId({
      contentId: req.params.id,
      user: req.currentUser!,
      body: req.body,
    });
    res.status(httpStatus.OK).send(questions);
  }
);

export const dialogueController = {
  generateDialogueController,
  generateDialogueSpeechController,
  generateIdeasController,
  generateDialogueImage,
  generateQuestionsByContentId,
};
