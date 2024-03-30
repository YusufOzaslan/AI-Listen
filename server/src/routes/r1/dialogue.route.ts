import express from "express";
import { dialogueController } from "../../controllers";

const router = express.Router();

router.post(
  "/generate-dialogue",
  dialogueController.generateDialogueController
);

router.post(
  "/generate-dialogue-speech",
  dialogueController.generateDialogueSpeechController
);


export { router as dialogueRouter };
