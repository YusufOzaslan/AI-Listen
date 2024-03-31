import { Content, IContentAttributes } from "../models";

export const createOne = async (attrs: IContentAttributes) => {
  const content = Content.build(attrs);
  await content.save();
  return content;
};

export const contentService = { createOne };
