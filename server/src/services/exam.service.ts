import httpStatus from "http-status";
import { Exam, IExamAttributes } from "../models";
import { AppError } from "../utils";
import { EAppError, ICurrentUser } from "../types";

const createOne = async (attrs: IExamAttributes) => {
  const exam = Exam.build(attrs);
  await exam.save();
  return exam;
};

export const examService = { createOne };
