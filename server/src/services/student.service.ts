import httpStatus from "http-status";
import { Student, IStudentAttributes } from "../models";
import { AppError } from "../utils";

const createOne = async (attrs: IStudentAttributes) => {
  const student = Student.build(attrs);
  await student.save();
  return student;
};
const findOneByStudentNumber = async (studentNumber: string) => {
  return await Student.findOne({ studentNumber }).exec();
};
export const studentService = { createOne, findOneByStudentNumber };
