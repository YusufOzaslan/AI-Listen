import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils";
import { contentService } from "../services";

const createContent = catchAsync(async (req: Request, res: Response) => {
  
  // const content = await contentService.createOne({
  //   user: req.session.userID!,
  //   title: req.body.title,
  //   dialogues: req.body.dialogues,
  //   audio: req.body.audio,
  // });
  // res.status(httpStatus.CREATED).send(content);
});

export const contentController = {
  createContent,
};
