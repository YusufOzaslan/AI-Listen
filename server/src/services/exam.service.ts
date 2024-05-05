import httpStatus from "http-status";
import { Exam } from "../models";
import { AppError } from "../utils";
import { EAppError, ICurrentUser } from "../types";
import { contentService } from "./content.service";
import { studentService } from "./student.service";
import { appConfig } from "../configs";

const encodeBase64 = (data: string) => {
  return Buffer.from(data, "utf-8").toString("base64");
};

const decodeBase64 = (base64: string) => {
  return Buffer.from(base64, "base64").toString("utf-8");
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
  return exam.sharingURL;
};

const start = async (
  examCode: string,
  body: {
    studentNumber: string;
    studentName: string;
  }
) => {
  const [examId] = decodeBase64(examCode).split("-");

  const exam = await Exam.findOne({ _id: examId }).exec();

  if (!exam) throw new AppError(httpStatus.NOT_FOUND, EAppError.NOT_FOUND);

  if (!exam.isSharingUrlValid(examCode))
    throw new AppError(httpStatus.BAD_REQUEST, EAppError.INVALID_EXAM_URL);

  const isStudentExist = await studentService.findOneByStudentNumber(
    body.studentNumber
  );
  const isExamTakenByStudent = isStudentExist
    ? exam.students.includes(isStudentExist._id)
    : isStudentExist;
  if (isExamTakenByStudent) {
    throw new AppError(httpStatus.BAD_REQUEST, EAppError.EXAM_ALREADY_TAKEN);
  }

  if (exam.students.length >= exam.capacity) {
    throw new AppError(httpStatus.BAD_REQUEST, EAppError.EXAM_OUT_OF_CAPACITY);
  }
  const student = await studentService.createOne({
    name: body.studentName,
    studentNumber: body.studentNumber,
    school: exam.school,
    class: exam.class,
  });

  exam.students.push(student._id);
  await exam.save();

  const content = await contentService.getContentById(exam.content);
  return {
    student,
    exam,
    content,
  };
};

export const examService = { createExam, start };
