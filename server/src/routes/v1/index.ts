import express from "express";
import { dialogueRouter } from "./dialogue.route";
import { authRouter } from "./auth.route";
import { contentRouter } from "./content.route";
import { questionRouter } from "./question.route";

const router = express.Router();

router.use("/dialogue", dialogueRouter);
router.use("/auth", authRouter);
router.use("/contents", contentRouter);
router.use("/questions", questionRouter);

export { router as v1Router };
