import mongoose from "mongoose";
import { EModel } from "./enums";

interface IScore {
  trueCount: number;
  falseCount: number;
}
export interface IStudentAttributes {
  name: string;
  number: string;
  school: string;
  class: string;
  score?: IScore;
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
    number: {
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
    score: {
      type: {
        trueCount: Number,
        falseCount: Number,
      },
      default: {},
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
