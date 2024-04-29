import express from "express";
import { auth } from "../../middlewares";
import { questionController } from "../../controllers";
const router = express.Router();

router.get("/:id", auth(), questionController.getQuestion);

export { router as questionRouter };
