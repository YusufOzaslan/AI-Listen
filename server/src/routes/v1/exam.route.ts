import express from "express";
import { auth } from "../../middlewares";
import { examController } from "../../controllers";
const router = express.Router();

router.post("/:id", auth(), examController.createExam);

router.post("/:code/start", examController.start);

export { router as examRouter };
