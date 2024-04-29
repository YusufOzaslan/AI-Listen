import express from "express";
import { validate, auth } from "../../middlewares";
import { contentController } from "../../controllers";
import {} from "../../validations";

const router = express.Router();

router.get("/", auth(), contentController.getContents);

router.get("/:id", auth(), contentController.getContent);

export { router as contentRouter };
