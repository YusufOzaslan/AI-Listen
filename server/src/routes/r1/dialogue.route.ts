import express from "express";
import { dialogueController } from "../../controllers";

const router = express.Router();

router.get("/test", dialogueController.test);
router.get("/plan", dialogueController.plan);

export { router as dialogueRouter };
