import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils";
import { examService } from "../services";

const createExam = catchAsync(async (req: Request, res: Response) => {
  const url = await examService.createExam({
    contentId: req.params.id,
    body: req.body,
    user: req.currentUser!,
  });
  res.status(httpStatus.CREATED).send(url);
});

export const examController = {
  createExam,
};
