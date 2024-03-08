import express from "express";
import { dialogueRouter } from "./dialogue.route";
import { ideaRouter } from "./idea.route";

const router = express.Router();

router.use("/dialogue", dialogueRouter);
router.use("/idea", ideaRouter);

export { router as r1Router };
