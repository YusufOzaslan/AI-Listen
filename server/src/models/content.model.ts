import mongoose from "mongoose";

export interface IContentAttributes {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  dialogues: {
    speaker: string;
    text: string;
  }[];
  audio: string;
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
    ref: "User",
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
  audio: {
    type: String,
    required: true,
  },
});

contentSchema.statics.build = (attrs: IContentAttributes): IContentDocument =>
  new Content(attrs);

contentSchema.post("init", (doc: any) => {
  doc.toJSON = () => {
    let obj = doc.toObject();
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    return obj;
  };
});

export const Content = mongoose.model<IContentDocument, IContentModel>(
  "content",
  contentSchema
);
