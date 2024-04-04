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
  "/generate-dialogue-speech",
  auth(),
  dialogueController.generateDialogueSpeechController
);

router.post(
  "/generate-ideas",
  auth(),
  dialogueController.generateIdeasController
);

router.post(
  "/generate-image",
  auth(),
  dialogueController.generateDialogueImage
);

export { router as dialogueRouter };
