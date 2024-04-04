import mongoose from "mongoose";
import { ETokenType } from "../types";
import { EModel } from "./enums";

export interface ITokenAttributes {
  user: mongoose.Schema.Types.ObjectId;
  type: ETokenType;
  value: string;
  expiryDate: Date;
}

export interface ITokenDocument extends mongoose.Document, ITokenAttributes {}

interface ITokenModel extends mongoose.Model<ITokenDocument> {
  build(attrs: ITokenAttributes): ITokenDocument;
}

const tokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: EModel.USER,
    },
    type: {
      type: String,
      enum: ETokenType,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

tokenSchema.statics.build = (attrs: ITokenAttributes): ITokenDocument =>
  new Token(attrs);

export const Token = mongoose.model<ITokenDocument, ITokenModel>(
  EModel.TOKEN,
  tokenSchema
);
