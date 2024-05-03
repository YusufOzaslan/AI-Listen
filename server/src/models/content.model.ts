import mongoose from "mongoose";
import { EModel } from "./enums";

export interface IFaceCoordinates {
  bottom_right_x: number;
  bottom_right_y: number;
  top_left_x: number;
  top_left_y: number;
}

export interface IDialogue {
  speaker: string;
  text: string;
}

export interface IContentAttributes {
  user: mongoose.Types.ObjectId;
  title: string;
  dialogues: IDialogue[];
  level: string;
  audio?: string;
  gender?: string[];
  imageData?: {
    image: string;
    faces: IFaceCoordinates[];
  };
}

export interface IContentDocument
  extends mongoose.Document,
    IContentAttributes {}

interface IContentModel extends mongoose.Model<IContentDocument> {
  build(attrs: IContentAttributes): IContentDocument;
}

const contentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: EModel.USER,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  dialogues: [
    {
      speaker: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
  level: {
    type: String,
    required: true,
  },
  gender: {
    type: [String],
  },
  audio: {
    type: String,
  },
  imageData: {
    image: String,
    faces: [
      {
        bottom_right_x: Number,
        bottom_right_y: Number,
        top_left_x: Number,
        top_left_y: Number,
      },
    ],
  },
});

contentSchema.statics.build = (attrs: IContentAttributes): IContentDocument =>
  new Content(attrs);

// contentSchema.post("init", (doc: any) => {
//   doc.toJSON = () => {
//     let obj = doc.toObject();
//     obj.id = obj._id;
//     delete obj._id;
//     delete obj.__v;
//     return obj;
//   };
// });

export const Content = mongoose.model<IContentDocument, IContentModel>(
  EModel.CONTENT,
  contentSchema
);
