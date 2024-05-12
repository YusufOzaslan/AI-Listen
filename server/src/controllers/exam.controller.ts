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
  const examInfo = await examService.start(req.params.code, req.body);
  const examToken = await tokenService.generateExamToken(
    { id: examInfo.examId, studentId: examInfo.studentId },
    examInfo.timeLimit
      ? {
          value: examInfo.timeLimit,
          unit: "m",
        }
      : undefined
  );
  res.cookie(
    appConfig.examCookie.name,
    examToken.value,
    appConfig.authCookie.config
  );
  res.status(httpStatus.CREATED).send(examInfo);
});

const examRefresh = catchAsync(async (req: Request, res: Response) => {
  const cookies = req.cookies;
  const result = await examService.examRefresh(
    cookies[appConfig.examCookie.name]
  );
  res.status(httpStatus.OK).send(result);
});

const saveAnswer = catchAsync(async (req: Request, res: Response) => {
  const cookies = req.cookies;
  const updatedStudentAnswers = await examService.saveAnswer(
    cookies[appConfig.examCookie.name],
    req.body
  );
  res.status(httpStatus.CREATED).send(updatedStudentAnswers);
});

const getExamUrl = catchAsync(async (req: Request, res: Response) => {
  const examUrl = await examService.getExamUrl(req.params.id, req.currentUser!);
  res.status(httpStatus.OK).send(examUrl);
});

const finishExam = catchAsync(async (req: Request, res: Response) => {
  const cookies = req.cookies;
  await examService.finishExam(cookies[appConfig.examCookie.name]);
  res.status(httpStatus.OK).send();
});

export const examController = {
  createExam,
  start,
  examRefresh,
  saveAnswer,
  getExamUrl,
  finishExam,
};
