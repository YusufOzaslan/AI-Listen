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

export const questionService = { createOne, getQuestionById };
