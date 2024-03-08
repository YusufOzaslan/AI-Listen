import express from "express";
import { ideaController } from "../../controllers";

const router = express.Router();

router.post("/generate-ideas", ideaController.generateIdeasController);

export { router as ideaRouter };
