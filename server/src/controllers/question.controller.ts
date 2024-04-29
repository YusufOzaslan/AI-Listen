import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils";
import { questionService } from "../services";

const getQuestion = catchAsync(async (req: Request, res: Response) => {
  const questions = await questionService.getQuestionByContentId(
    req.params.id,
    req.currentUser!
  );
  res.status(httpStatus.OK).send(questions);
});

export const questionController = {
  getQuestion,
};
