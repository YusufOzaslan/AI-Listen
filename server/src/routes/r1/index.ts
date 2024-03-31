import express from "express";
import { dialogueRouter } from "./dialogue.route";
import { authRouter } from "./auth.route";

const router = express.Router();

router.use("/dialogue", dialogueRouter);
router.use("/auth", authRouter);

export { router as r1Router };
