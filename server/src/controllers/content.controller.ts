import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils";
import { contentService } from "../services";

const getContents = catchAsync(async (req: Request, res: Response) => {
  const contents = await contentService.getMany(req.currentUser!);
  res.status(httpStatus.OK).send(contents);
});

export const contentController = {
  getContents,
};
