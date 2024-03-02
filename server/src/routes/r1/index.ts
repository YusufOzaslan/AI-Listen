import express from "express";
import { dialogueRouter } from "./dialogue.route";

const router = express.Router();

router.use("/dialogue", dialogueRouter);

export {router as r1Router};