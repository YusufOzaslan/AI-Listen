import express from "express";
import { auth } from "../../middlewares";
import { examController } from "../../controllers";
const router = express.Router();

router.post("/:id", auth(), examController.createExam);

export { router as examRouter };
