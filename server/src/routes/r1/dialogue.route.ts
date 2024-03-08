import express from "express";
import { dialogueController } from "../../controllers";

const router = express.Router();

router.get("/test", dialogueController.test);
router.get("/plan", dialogueController.plan);
router.post("/generate-dialogue", dialogueController.generateDialogueController);

export { router as dialogueRouter };
