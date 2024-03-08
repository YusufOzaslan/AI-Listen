import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils";
import { generateDialogue } from "../services";
const test = catchAsync(async (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({ message: "test" });
});
const plan = catchAsync(async (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({ message: "plan" });
});
const generateDialogueController = catchAsync(
  async (req: Request, res: Response) => {
    const dialogue = await generateDialogue(req.body);
    res.status(httpStatus.OK).send(dialogue);
  }
);
export const dialogueController = { test, plan, generateDialogueController };
