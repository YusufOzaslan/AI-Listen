import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils";
const test = catchAsync(async (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({ message: "test" });
});
const plan = catchAsync(async (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({ message: "plan" });
});
export const dialogueController = { test, plan };
