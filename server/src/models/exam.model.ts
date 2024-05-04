import mongoose from "mongoose";
import { EModel } from "./enums";

export interface IExamAttributes {
  user: string;
  title: string;
  content: string;
  sharingURL: string;
  school: string;
  capacity: number;
  classes: string[];
  hasFinished?: boolean;
  timeLimitInMinutes?: number;
  students: string[];
}

export interface IExamDocument extends mongoose.Document, IExamAttributes {}

interface IExamModel extends mongoose.Model<IExamDocument> {
  build(attrs: IExamAttributes): IExamDocument;
}

const examSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: EModel.USER,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: mongoose.Schema.Types.ObjectId,
      ref: EModel.CONTENT,
      required: true,
    },
    sharingURL: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    classes: {
      type: [String],
      required: true,
    },
    hasFinished: {
      type: Boolean,
      default: false,
    },
    timeLimitInMinutes: {
      type: Number,
      default: 60,
    },
    students: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: EModel.STUDENT,
      required: true,
    },
  },
  { timestamps: true }
);

examSchema.statics.build = (attrs: IExamAttributes): IExamDocument =>
  new Exam(attrs);

export const Exam = mongoose.model<IExamDocument, IExamModel>(
  EModel.EXAM,
  examSchema
);
