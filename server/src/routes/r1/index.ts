import express from "express";
import { dialogueRouter } from "./dialogue.route";
import { authRouter } from "./auth.route";
import { contentRouter } from "./content.route";

const router = express.Router();

router.use("/dialogue", dialogueRouter);
router.use("/auth", authRouter);
router.use("/content", contentRouter);

export { router as r1Router };
