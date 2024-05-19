import httpStatus from "http-status";
import { Content, Exam } from "../models";
import { AppError } from "../utils";
import { EAppError, ICurrentUser } from "../types";
import { contentService } from "./content.service";
import { studentService } from "./student.service";
import { tokenService } from "./token.service";
import { appConfig } from "../configs";
import { questionService } from "./question.service";
import { IContentAttributes, IStudentAnswers, IScore } from "../models";
import mongoose from "mongoose";

interface IExamQuestion {
  id: mongoose.Schema.Types.ObjectId;
  question: string;
  options: string[];
}
interface IExamInfo {
  examId: mongoose.Schema.Types.ObjectId;
  questions: IExamQuestion[];
  startTime: number;
  timeLimit: number;
  studentId: string;
  studentName: string;
  content: IContentAttributes;
  studentAnswers: IStudentAnswers[];
}
interface IStudentResult {
  name: string;
  studentNumber: string;
  score: IScore;
  startTime: number;
  finishTime?: number;
}
interface IExamResult {
  examName: string;
  contentTitle: string;
  school: string;
  class: string;
  timeLimitInMinutes: number;
  capacity: number;
  students: IStudentResult[];
}
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

  const isStudentExist = await studentService.findStudent(
    body.studentNumber as string,
    exam._id as string
  );

  const isExamTakenByStudent = isStudentExist
    ? exam.students.includes(isStudentExist._id as string)
    : false;
  if (isExamTakenByStudent) {
    throw new AppError(httpStatus.BAD_REQUEST, EAppError.EXAM_ALREADY_TAKEN);
  }

  if (exam.students.length >= exam.capacity) {
    throw new AppError(httpStatus.BAD_REQUEST, EAppError.EXAM_OUT_OF_CAPACITY);
  }

  const content = await Content.findOne({ _id: exam.content }).exec();
  if (!content) throw new AppError(httpStatus.NOT_FOUND, EAppError.NOT_FOUND);
  const questions = await questionService.getQuestionsByContentId(
    content._id as string
  );

  const examQuestions: IExamQuestion[] = questions.map((question) => ({
    id: question._id as mongoose.Schema.Types.ObjectId,
    question: question.question,
    options: question.options,
  }));

  const studentAnswers: IStudentAnswers[] = questions.map((question) => ({
    questionId: question._id as mongoose.Schema.Types.ObjectId,
    answer: "",
  }));

  const student = await studentService.createOne({
    name: body.studentName,
    studentNumber: body.studentNumber,
    examId: exam._id,
    school: exam.school,
    class: exam.class,
    startTime: Math.floor(Date.now() / 1000),
    studentAnswers,
  });

  exam.students.push(student._id as string);
  await exam.save();

  const examInfo: IExamInfo = {
    examId: exam._id as mongoose.Schema.Types.ObjectId,
    questions: examQuestions,
    studentId: student.studentNumber,
    content: content,
    timeLimit: exam.timeLimitInMinutes,
    startTime: student.startTime,
    studentName: student.name,
    studentAnswers,
  };
  return examInfo;
};

const examRefresh = async (examToken: string | undefined) => {
  if (!examToken)
    throw new AppError(httpStatus.UNAUTHORIZED, EAppError.UNAUTHORIZED);

  const { id, studentId } = await tokenService.verifyExamToken(examToken);

  const exam = await Exam.findOne({
    _id: id as mongoose.Schema.Types.ObjectId,
  });

  if (!exam || !studentId)
    throw new AppError(httpStatus.UNAUTHORIZED, EAppError.UNAUTHORIZED);

  const content = await contentService.getContentById(exam.content as string);
  const questions = await questionService.getQuestionsByContentId(
    content._id as string
  );
  const student = await studentService.findStudent(
    studentId as string,
    exam._id as string
  );

  if (!student || !questions || !content)
    throw new AppError(httpStatus.NOT_FOUND, EAppError.NOT_FOUND);

  if (student.hasFinished)
    throw new AppError(httpStatus.UNAUTHORIZED, EAppError.EXAM_IS_OVER);

  const examQuestions: IExamQuestion[] = questions.map((question) => ({
    id: question._id as mongoose.Schema.Types.ObjectId,
    question: question.question,
    options: question.options,
  }));

  const examInfo: IExamInfo = {
    examId: exam._id as mongoose.Schema.Types.ObjectId,
    questions: examQuestions,
    studentId: student.studentNumber,
    content: content,
    timeLimit: exam.timeLimitInMinutes,
    startTime: student.startTime,
    studentName: student.name,
    studentAnswers: student.studentAnswers,
  };
  return examInfo;
};

const saveAnswer = async (
  examToken: string | undefined,
  body: IStudentAnswers[]
) => {
  if (!examToken)
    throw new AppError(httpStatus.UNAUTHORIZED, EAppError.UNAUTHORIZED);

  const { id, studentId } = await tokenService.verifyExamToken(examToken);

  const exam: any = await Exam.findOne({
    _id: id,
  });

  if (!exam || !studentId)
    throw new AppError(httpStatus.UNAUTHORIZED, EAppError.UNAUTHORIZED);

  const content = await contentService.getContentById(exam.content);
  const questions = await questionService.getQuestionsByContentId(
    content._id as string
  );
  const student = await studentService.findStudent(
    studentId as string,
    exam._id as string
  );

  console.log(student)
  if (!student || !questions || !content)
    throw new AppError(httpStatus.NOT_FOUND, EAppError.NOT_FOUND);

  if (student.hasFinished)
    throw new AppError(httpStatus.UNAUTHORIZED, EAppError.EXAM_IS_OVER);

  const updatedStudentAnswers = studentService.saveAnswer(
    student._id as string,
    body,
    exam.content
  );

  return updatedStudentAnswers;
};

const finishExam = async (examToken: string | undefined) => {
  if (!examToken)
    throw new AppError(httpStatus.UNAUTHORIZED, EAppError.UNAUTHORIZED);

  const { id, studentId } = await tokenService.verifyExamToken(examToken);

  const exam: any = await Exam.findOne({
    _id: id,
  });

  if (!exam || !studentId)
    throw new AppError(httpStatus.UNAUTHORIZED, EAppError.UNAUTHORIZED);

  const student = await studentService.findStudent(
    studentId as string,
    exam._id as string
  );

  if (!student) throw new AppError(httpStatus.NOT_FOUND, EAppError.NOT_FOUND);

  if (student.hasFinished)
    throw new AppError(httpStatus.UNAUTHORIZED, EAppError.EXAM_IS_OVER);

  student.set({ hasFinished: true, finishTime: Math.floor(Date.now() / 1000) });
  student.save();
  return;
};

const getExamUrl = async (contentId: string, user: ICurrentUser) => {
  const exam = await Exam.findOne({ content: contentId, user: user.id });

  if (!exam) throw new AppError(httpStatus.NOT_FOUND, EAppError.NOT_FOUND);

  if (exam.user.toString() !== user.id.toString())
    throw new AppError(httpStatus.FORBIDDEN, EAppError.FORBIDDEN);
  return exam.sharingURL;
};

const getExamResults = async (user: ICurrentUser) => {
  const exams = await Exam.find({ user: user.id });

  if (!exams) throw new AppError(httpStatus.NOT_FOUND, EAppError.NOT_FOUND);

  if (exams[0].user.toString() !== user.id.toString())
    throw new AppError(httpStatus.FORBIDDEN, EAppError.FORBIDDEN);

  const examResults: IExamResult[] = [];
  for (const exam of exams) {
    const content = await contentService.getContentById(exam.content as string);
    const contentTitle = content.title;

    const students: IStudentResult[] = [];
    for (const studentId of exam.students) {
      const student = await studentService.findOneByCollectionId(studentId);
      if (!student) continue;
      students.push({
        name: student.name,
        studentNumber: student.studentNumber,
        score: student.score!,
        startTime: student.startTime,
        finishTime: student.finishTime,
      });
    }

    examResults.push({
      examName: exam.examName,
      contentTitle,
      school: exam.school,
      class: exam.class,
      timeLimitInMinutes: exam.timeLimitInMinutes,
      capacity: exam.capacity,
      students,
    });
  }
  return examResults;
};

export const examService = {
  createExam,
  start,
  examRefresh,
  saveAnswer,
  getExamUrl,
  finishExam,
  getExamResults,
};
