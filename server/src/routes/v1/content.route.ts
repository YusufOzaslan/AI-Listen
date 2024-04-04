import express from "express";
import { validate, auth } from "../../middlewares";
import { contentController } from "../../controllers";
import {} from "../../validations";

const router = express.Router();

router.post("/", auth(), contentController.createContent);

export { router as contentRouter };
