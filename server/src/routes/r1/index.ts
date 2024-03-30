import express from "express";
import { dialogueRouter } from "./dialogue.route";
import { ideaRouter } from "./idea.route";
import { authRouter } from "./auth.route";

const router = express.Router();

router.use("/dialogue", dialogueRouter);
router.use("/idea", ideaRouter);
router.use("/auth", authRouter);

export { router as r1Router };
