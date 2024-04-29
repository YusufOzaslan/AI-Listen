import httpStatus from "http-status";
import { Question, IQuestionAttributes } from "../models";
import { AppError } from "../utils";
import { EAppError, ICurrentUser } from "../types";

const createOne = async (attrs: IQuestionAttributes) => {
  const question = Question.build(attrs);
  await question.save();
  return question;
};

const getQuestionById = async (questionId: string, user: ICurrentUser) => {
  const question = await Question.findOne({ _id: questionId }).exec();
  if (!question) throw new AppError(httpStatus.NOT_FOUND, EAppError.NOT_FOUND);
  if (question.user.toString() !== user.id.toString())
    throw new AppError(httpStatus.FORBIDDEN, EAppError.FORBIDDEN);

  return question;
};

const getQuestionByContentId = async (contentId: string, user: ICurrentUser) => {
  const question = await Question.findOne({ content: contentId }).exec();
  if (!question) throw new AppError(httpStatus.NOT_FOUND, EAppError.NOT_FOUND);
  if (question.user.toString() !== user.id.toString())
    throw new AppError(httpStatus.FORBIDDEN, EAppError.FORBIDDEN);

  return question;
};

const deleteQuestionsByContentId = async (content: string) => {
  await Question.deleteMany({ content }).exec();
};

export const questionService = {
  createOne,
  getQuestionById,
  deleteQuestionsByContentId,
  getQuestionByContentId
};
