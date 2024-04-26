import express from "express";
import { auth, validate } from "../../middlewares";
import { dialogueController } from "../../controllers";

const router = express.Router();

router.post(
  "/generate-dialogue",
  auth(),
  dialogueController.generateDialogueController
);

router.post(
  "/:id/generate-dialogue-speech",
  auth(),
  dialogueController.generateDialogueSpeechController
);

router.post(
  "/generate-ideas",
  auth(),
  dialogueController.generateIdeasController
);

router.post(
  "/:id/generate-image",
  auth(),
  dialogueController.generateDialogueImage
);

router.post(
  "/:id/generate-questions",
  auth(),
  dialogueController.generateQuestionsByContentId
);

export { router as dialogueRouter };
