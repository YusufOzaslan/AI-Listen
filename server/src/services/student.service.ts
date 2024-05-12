import httpStatus from "http-status";
import {
  Student,
  IStudentAttributes,
  IStudentAnswers,
  IQuestionDocument,
} from "../models";
import { AppError } from "../utils";
import { EAppError } from "../types";
import { questionService } from "./question.service";

const createOne = async (attrs: IStudentAttributes) => {
  const student = Student.build(attrs);
  await student.save();
  return student;
};

const findOneByStudentNumber = async (studentNumber: string) => {
  return await Student.findOne({ studentNumber }).exec();
};

const saveAnswer = async (
  studentId: string,
  answers: IStudentAnswers[],
  contentId: string
) => {
  const student = await Student.findOne({ _id: studentId }).exec();
  if (!student) throw new AppError(httpStatus.NOT_FOUND, EAppError.NOT_FOUND);

  const questions = await questionService.getQuestionsByContentId(contentId);
  const questionsAnswerKey = questions.map((question) => ({
    qId: question._id,
    answerKey: question.answer,
  }));

  let trueCount = 0;
  let falseCount = 0;
  answers.forEach((studentAnswer) => {
    const correctAnswer = questionsAnswerKey.find(
      (item) => item.qId.toString() === studentAnswer.questionId.toString()
    );
    if (correctAnswer && correctAnswer.answerKey === studentAnswer.answer) {
      trueCount++;
    } else {
      falseCount++;
    }
  });

  student.studentAnswers = answers;
  student.score = { trueCount, falseCount };
  await student.save();
  return answers;
};
export const studentService = { createOne, findOneByStudentNumber, saveAnswer };
