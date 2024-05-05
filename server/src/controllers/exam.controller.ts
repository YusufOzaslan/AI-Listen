import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils";
import { examService, tokenService } from "../services";
import { appConfig } from "../configs";

const createExam = catchAsync(async (req: Request, res: Response) => {
  const url = await examService.createExam({
    contentId: req.params.id,
    body: req.body,
    user: req.currentUser!,
  });
  res.status(httpStatus.CREATED).send(url);
});

const start = catchAsync(async (req: Request, res: Response) => {
  const { exam, student, content } = await examService.start(req.params.code, req.body);
  const examToken = await tokenService.generateExamToken(
    { id: exam.id },
    exam.timeLimitInMinutes
      ? {
          value: exam.timeLimitInMinutes,
          unit: "m",
        }
      : undefined
  );
  res.cookie(
    appConfig.examCookie.name,
    examToken.value,
    appConfig.authCookie.config
  );
  res.status(httpStatus.CREATED).send({student, content});
});

export const examController = {
  createExam,
  start,
};
