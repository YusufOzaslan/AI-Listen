import httpStatus from "http-status";
import { Student, IStudentAttributes } from "../models";
import { AppError } from "../utils";
import { EAppError, ICurrentUser } from "../types";

const createOne = async (attrs: IStudentAttributes) => {
  const student = Student.build(attrs);
  await student.save();
  return student;
};

export const studentService = { createOne };
