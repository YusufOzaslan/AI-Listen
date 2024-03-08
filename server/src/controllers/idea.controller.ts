import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils";
import { generateIdeas } from "../services";
const generateIdeasController = catchAsync(
  async (req: Request, res: Response) => {
    const ideas = await generateIdeas(req.body);
    res.status(httpStatus.OK).send(ideas);
  }
);
export const ideaController = { generateIdeasController };
