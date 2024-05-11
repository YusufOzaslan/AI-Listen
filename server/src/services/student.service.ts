import httpStatus from "http-status";
import { Student, IStudentAttributes, IStudentAnswers } from "../models";
import { AppError } from "../utils";
import { EAppError } from "../types";

const createOne = async (attrs: IStudentAttributes) => {
  const student = Student.build(attrs);
  await student.save();
  return student;
};

const findOneByStudentNumber = async (studentNumber: string) => {
  return await Student.findOne({ studentNumber }).exec();
};

const saveAnswer = async (studentId: string, answers: IStudentAnswers[]) => {
  const student = await Student.findOne({ _id: studentId }).exec();
  if (!student) throw new AppError(httpStatus.NOT_FOUND, EAppError.NOT_FOUND);

  // const updatedStudentAnswers = student.studentAnswers.map((studentAnswer) => {
  //   if (studentAnswer.questionId.toString() === questionId) {
  //     return { ...studentAnswer, answer };
  //   }
  //   return studentAnswer;
  // });
  student.studentAnswers = answers;
  await student.save();
  return answers;
};
export const studentService = { createOne, findOneByStudentNumber, saveAnswer };
