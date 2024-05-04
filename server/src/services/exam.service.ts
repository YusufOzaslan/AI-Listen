import httpStatus from "http-status";
import { Exam, IExamAttributes } from "../models";
import { AppError } from "../utils";
import { EAppError, ICurrentUser } from "../types";
import { contentService } from "./content.service";
import { appConfig } from "../configs";

const encodeBase64 = (data: string) => {
  return Buffer.from(data, "utf-8").toString("base64");
};

const createExam = async ({
  contentId,
  user,
  body,
}: {
  contentId: string;
  user: ICurrentUser;
  body: {
    examName: string;
    school: string;
    class: string;
    capacity: number;
    timeLimitInMinutes?: number;
  };
}) => {
  const exam = new Exam({
    user,
    content: contentId,
    examName: body.examName,
    school: body.school,
    class: body.class,
    capacity: body.capacity,
    timeLimitInMinutes: body.timeLimitInMinutes,
  });
  const base64 = encodeBase64(
    `${exam._id}-${user.name}-${body.school}-${body.class}`
  );

  exam.set({ sharingURL: `${appConfig.origin}/public/exam/${base64}` });

  await exam.save();
  //console.log(exam)
  return exam.sharingURL;
};

const getExamByContentId = async (id: string, user: ICurrentUser) => {
  const exam = await Exam.findOne({ content: id }).exec();
  if (!exam) throw new AppError(httpStatus.NOT_FOUND, EAppError.NOT_FOUND);

  if (exam.user.toString() !== user.id.toString())
    throw new AppError(httpStatus.FORBIDDEN, EAppError.FORBIDDEN);
  return exam;
};
export const examService = { createExam };
