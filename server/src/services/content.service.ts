import httpStatus from "http-status";
import { Content, IContentAttributes } from "../models";
import { AppError } from "../utils";
import { EAppError, ICurrentUser } from "../types";

const createOne = async (attrs: IContentAttributes) => {
  const content = Content.build(attrs);
  await content.save();
  return content;
};

const getContentByIdOne = async (id: string, user: ICurrentUser) => {
  const content = await Content.findOne({ _id: id }).exec();
  if (!content) throw new AppError(httpStatus.NOT_FOUND, EAppError.NOT_FOUND);

  if (content.user.toString() !== user.id.toString())
    throw new AppError(httpStatus.FORBIDDEN, EAppError.FORBIDDEN);
  return content;
};

const getMany = async (user: ICurrentUser) => {
  const contents = await Content.find({ user: user.id }).exec();
  return contents;
};

export const contentService = { createOne, getContentByIdOne, getMany };
