import express from "express";
import { validate } from "../../middlewares";
import { authController } from "../../controllers";
import { authValidation } from "../../validations";

const router = express.Router();

router.post("/sign-up", validate(authValidation.signUp), authController.signUp);

router.post("/sign-in", validate(authValidation.signIn), authController.signIn);

export { router as authRouter };
