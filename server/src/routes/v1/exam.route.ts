import express from "express";
import { auth } from "../../middlewares";
import { examController } from "../../controllers";
const router = express.Router();

router.post("/:id", auth(), examController.createExam);

router.post("/:code/start", examController.start);

router.get('/refresh', examController.examRefresh);

router.patch('/save-answer', examController.saveAnswer);

router.get('/:id/url', auth(), examController.getExamUrl);

router.patch('/finish-exam', examController.finishExam);

export { router as examRouter };
