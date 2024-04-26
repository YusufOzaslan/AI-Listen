import mongoose from "mongoose";
import { EModel } from "./enums";

export interface IQuestionAttributes {
  content: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  question: string;
  options: string[];
  answer: string;
}

export interface IQuestionDocument
  extends mongoose.Document,
    IQuestionAttributes {}

interface IQuestionModel extends mongoose.Model<IQuestionDocument> {
  build(attrs: IQuestionAttributes): IQuestionDocument;
}

const questionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: EModel.USER,
      required: true,
    },
    content: {
      type: mongoose.Schema.Types.ObjectId,
      ref: EModel.CONTENT,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

questionSchema.statics.build = (
  attrs: IQuestionAttributes
): IQuestionDocument => new Question(attrs);

export const Question = mongoose.model<IQuestionDocument, IQuestionModel>(
  EModel.QUESTION,
  questionSchema
);
