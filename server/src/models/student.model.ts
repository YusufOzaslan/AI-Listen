import mongoose from "mongoose";
import { EModel } from "./enums";

interface IScore {
  trueCount: number;
  falseCount: number;
}
export interface IStudentAnswers {
  questionId: mongoose.Schema.Types.ObjectId;
  answer: string;
}
export interface IStudentAttributes {
  name: string;
  studentNumber: string;
  school: string;
  class: string;
  startTime: number;
  studentAnswers: IStudentAnswers[];
  score?: IScore;
  hasFinished?: boolean;
}

export interface IStudentDocument
  extends mongoose.Document,
    IStudentAttributes {}

interface IStudentModel extends mongoose.Model<IStudentDocument> {
  build(attrs: IStudentAttributes): IStudentDocument;
}

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    studentNumber: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    startTime: {
      type: Number,
      required: true,
    },
    hasFinished: {
      type: Boolean,
      default: false,
    },
    studentAnswers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: EModel.QUESTION,
          required: false,
        },
        answer: {
          type: String,
          required: false,
        },
      },
    ],
    score: {
      type: {
        trueCount: {
          type: Number,
          default: 0,
        },
        falseCount: {
          type: Number,
          default: 0,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

studentSchema.statics.build = (attrs: IStudentAttributes): IStudentDocument =>
  new Student(attrs);

export const Student = mongoose.model<IStudentDocument, IStudentModel>(
  EModel.STUDENT,
  studentSchema
);
